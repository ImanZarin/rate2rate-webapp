// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Modal, ModalHeader, ModalBody, Row, Col, Table } from 'reactstrap';
import { GetMovieInfoResponse, GetMovieInfoForSignedResponse, UpdateMovieRateResponse } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RateModal, ModalTypes } from '../Rate/RateComponent';
import './movie.scss';
import { MyFetch } from '../../shared/my-fetch';
import { GetMovieInfoForSignedResponseResult, GetMovieInfoResponseResult, UpdateMovieRateResponseResult } from '../../shared/result.enums';
import { Movie, MovieRate } from '../../shared/dto.models';
import { isNullOrUndefined } from 'util';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PercnetageCircle from '../PercentageCircle';

type MyState = {
    isLoading: boolean;
    mainList: MovieRate[];
    alertIsOpen: boolean;
    error: Error;
    movie?: Movie;
    modalIsOpen: boolean;
    personRate: number;
    likebility: number;
}

type MyProps = {
    isLoggedin?: boolean;
    logout: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class MovieComponent extends Component<RouteComponentProps<any> & MyProps, MyState>{

    myfetchObjet = new MyFetch();
    _isMounted = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: RouteComponentProps<any> & MyProps) {
        super(props);
        this.state = {
            isLoading: false,
            alertIsOpen: false,
            movie: undefined,
            error: new Error,
            mainList: [],
            modalIsOpen: false,
            personRate: 0,
            likebility: 0,
        }
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeRate = this.changeRate.bind(this);
    }

    componentDidMount(): void {
        window.scrollTo(0, 0);
        this._isMounted = true;
        if (!isNullOrUndefined(this.props.match.params.id)) {
            this.fetchList(this.props.match.params.id);
        }

    }

    componentWillUnmount(): void {
        this._isMounted = false;
        this.myfetchObjet.abort();
    }

    showAndHideAlert(e: Error, wait: number): void {
        this.setState({
            error: e,
            alertIsOpen: true,
            isLoading: false
        });
        setTimeout(() => {
            if (!this._isMounted)
                return;
            this.setState({
                alertIsOpen: false,
                isLoading: false
            });
        }, wait);
    }

    closeAlert(): void {
        this.setState({
            alertIsOpen: false
        });
    }

    toggleModal(): void {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    changeRate(newRate: number) {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.rateMovie(newRate, this.props.match.params.id)
            .then(response => {
                if (!this._isMounted)
                    return;
                this.toggleModal();
                if (response.ok) {
                    response.json()
                        .then((r: UpdateMovieRateResponse) => {
                            switch (r.result) {
                                case UpdateMovieRateResponseResult.success:
                                    this.setState({
                                        isLoading: false,
                                        personRate: r.movieuser.rate
                                    });
                                    break;
                                case UpdateMovieRateResponseResult.movieuserNotFound:
                                    {
                                        const err = new Error(this.props.tr("movie-rating-err-notfound"));
                                        this.showAndHideAlert(err, Constants.waitLong);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        })
                        .catch((er: Error) => {
                            this.showAndHideAlert(er, Constants.waitShort);
                        })
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    this.showAndHideAlert(error, Constants.waitShort);
                }
            }, error => {
                this.toggleModal();
                this.showAndHideAlert(error, Constants.waitShort);
            })
            .catch(error => {
                this.showAndHideAlert(error, Constants.waitShort);
                this.toggleModal();
            });
    }

    fetchList = (movieId: string): void => {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.getMovieInfo(movieId)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((r: GetMovieInfoResponse | GetMovieInfoForSignedResponse) => {
                            if ((r as GetMovieInfoForSignedResponse).myRate !== undefined) {
                                const r2 = r as GetMovieInfoForSignedResponse;
                                switch (r2.result) {
                                    case GetMovieInfoForSignedResponseResult.movieNotFound:
                                        {
                                            const err = new Error(this.props.tr("movie-fetchinfo-err-nomovie"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetMovieInfoForSignedResponseResult.listEmpty:
                                        {
                                            this.setState({
                                                movie: r2.movie,
                                                personRate: r2.myRate.rate,
                                                likebility: r2.myLikebility
                                            });
                                            const err = new Error(this.props.tr("movie-fetchinfo-err-emptybuddies"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetMovieInfoForSignedResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r2.users,
                                            movie: r2.movie,
                                            personRate: r2.myRate.rate,
                                            likebility: r2.myLikebility
                                        });
                                        break;
                                    case GetMovieInfoForSignedResponseResult.userFake:
                                        this.props.logout();
                                        this.setState({
                                            isLoading: false,
                                            mainList: [],
                                            movie: r2.movie,
                                        });
                                        break;
                                    case GetMovieInfoForSignedResponseResult.noRate:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r2.users,
                                            movie: r2.movie,
                                            likebility: r2.myLikebility
                                        });
                                        break;
                                    default:
                                        break;
                                }

                            } else {
                                const r3 = r as GetMovieInfoResponse;
                                switch (r3.result) {
                                    case GetMovieInfoResponseResult.movieNotFound:
                                        {
                                            const err = new Error(this.props.tr("movie-fetchinfo-err-nomovie"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetMovieInfoResponseResult.listEmpty:
                                        {
                                            this.setState({
                                                movie: r3.movie
                                            });
                                            const err = new Error(this.props.tr("movie-fetchinfo-err-emptyusers"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetMovieInfoResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r3.users,
                                            movie: r3.movie
                                        });
                                        break;
                                    default:
                                        break;
                                }
                            }

                        })
                        .catch((er: Error) => {
                            this.showAndHideAlert(er, Constants.waitShort);
                        })
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    this.showAndHideAlert(error, Constants.waitShort);
                }
            },
                error => {
                    this.showAndHideAlert(error, Constants.waitShort);
                })
            .catch(error => {
                this.showAndHideAlert(error, Constants.waitShort);
            });


    }

    render(): JSX.Element {
        if (!this.state.movie)
            return <div></div>;
        return (
            <div className="movie-bg">
                <Row>
                    <Col xs={12} md={4} className="img_container">
                        <img src={this.state.movie?.poster.length > 5 ? this.state.movie.poster : require("../../assets/jumbotron.jpg")}
                            className="img_main" />
                    </Col>
                    <Col xs={12} md={8} className="movie_header">
                        <Row>
                            <div>
                                <span className="movie_title">{this.state.movie?.title}</span>
                                <span> ({this.state.movie?.year})</span>
                            </div>
                            <div onClick={this.toggleModal} className="score_section">
                                <div style={{ display: !this.props.isLoggedin || (this.state.personRate < 1 && this.state.likebility > 0) ? "none" : "block", }}>
                                    <span className={this.state.personRate > 0 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                                    <span className={this.state.personRate > 1 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                                    <span className={this.state.personRate > 2 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                                    <span className={this.state.personRate > 3 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                                    <span className={this.state.personRate > 4 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                                </div>
                                <div style={{ display: this.state.personRate < 1 && this.state.likebility > 0 ? "block" : "none", }}>
                                    <PercnetageCircle
                                        circleColor=""
                                        circleInnerColor=""
                                        circleSize={65}
                                        duration={2500}
                                        offset={0}
                                        percent={this.state.likebility}
                                        fontColor="" />

                                </div>
                            </div>
                        </Row>
                        <p>{this.state.movie?.genre?.join(" ,")}  -&nbsp; 
                        {Math.floor(this.state.movie?.duratin / 60)}h {this.state.movie?.duratin % 60}min</p>
                        <p>{this.state.movie?.plot}</p>
                        <h6>{this.props.tr("movie-director-title")}: </h6>
                        <p>{this.state.movie?.director?.join(" ,")}</p>
                        <h6>{this.props.tr("movie-actor-title")}: </h6>
                        <p>{this.state.movie?.actors?.join(" ,")}</p>
                    </Col>
                </Row>
                <div className="rates_section"
                    style={{ display: this.state.mainList.length > 0 ? "block" : "none" }}>
                    <Table striped className="movie-table" size="sm">
                        <thead>
                            <tr>
                                <th>{this.props.tr("movie-rates-col1")}</th>
                                <th>{this.props.tr("movie-rates-col2")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.mainList?.map((userRated) => {
                                return (
                                    <tr key={userRated.userId} style={{ cursor: "pointer" }}
                                        onClick={() => this.props.history.push("/user/" + userRated.userId)}>
                                        <td>{userRated.userName}</td>
                                        <td>
                                            <span style={{ visibility: userRated.rate > 0 ? "visible" : "hidden" }}
                                                className={"filled_star fa fa-star"} />
                                            <span style={{ visibility: userRated.rate > 1 ? "visible" : "hidden" }}
                                                className={"filled_star fa fa-star"} />
                                            <span style={{ visibility: userRated.rate > 2 ? "visible" : "hidden" }}
                                                className={"filled_star fa fa-star"} />
                                            <span style={{ visibility: userRated.rate > 3 ? "visible" : "hidden" }}
                                                className={"filled_star fa fa-star"} />
                                            <span style={{ visibility: userRated.rate > 4 ? "visible" : "hidden" }}
                                                className={"filled_star fa fa-star"} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
                    <ModalHeader className="modal-header">
                        <h5>{this.props.tr("movie_modal_title")}</h5>
                    </ModalHeader>
                    <ModalBody className="modal-body">
                        <RateModal type={ModalTypes.movies}
                            changeRate={this.changeRate}
                            tr={this.props.tr} />
                    </ModalBody>
                </Modal>

                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="warning" className="myAlert">{this.state.error?.message}</Alert>
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.tr} />
                </div>
            </div>
        );
    }
}


export default withRouter(MovieComponent);