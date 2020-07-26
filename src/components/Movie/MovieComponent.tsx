// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment, ChangeEvent } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { MovieRate } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Modal, ModalHeader, ModalBody, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { GetUserInfoResponse, GetUserInfoForSignedResponse, IUser, UpdateBodyResponse, IMovie, GetMovieInfoResponse, GetMovieInfoForSignedResponse, UserRate, UpdateMovieRateResponse, SearchMovieResponse, IMDBsearch } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RateModal, ModalTypes } from '../Rate/RateComponent';
import './movie.scss';
import { MyFetch } from '../../shared/my-fetch';
import { GetUserInfoResponseResult, GetUserInfoForSignedResponseResult, UpdateBodyResponseResult, GetMovieInfoForSignedResponseResult, GetMovieInfoResponseResult, UpdateMovieRateResponseResult, SearchMovieResponseResult } from '../../shared/result.enums';

type RouteParams = {
    id: string;
}

type MyState = {
    isLoading: boolean;
    mainList: UserRate[];
    alertIsOpen: boolean;
    error: Error;
    movie: IMovie;
    modalIsOpen: boolean;
    personRate: number;
    searchText: string;
    searchResult: IMDBsearch[];
}

type MyProps = {
    isLoggedin: boolean;
    mUser: IUser;
    searchMode: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

class MovieComponent extends Component<RouteComponentProps<RouteParams> & MyProps, MyState>{

    myfetchObjet = new MyFetch();

    constructor(props: RouteComponentProps<RouteParams> & MyProps) {
        super(props);
        this.state = {
            isLoading: false,
            alertIsOpen: false,
            movie: {
                _id: "",
                title: "",
                genre: [],
                cast: [],
                director: [],
                brief: "",
                imageUrl: "",
                year: 0,
                imdbId: ""
            },
            error: new Error,
            mainList: [],
            modalIsOpen: false,
            personRate: 0,
            searchText: "",
            searchResult: []
        }
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeRate = this.changeRate.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount(): void {
        if (!this.props.searchMode)
            this.fetchList(this.props.match.params.id);

    }

    showAndHideAlert(e: Error, wait: number): void {
        this.setState({
            error: e,
            alertIsOpen: true,
            isLoading: false
        });
        setTimeout(() => {
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
                            if ((r as GetMovieInfoForSignedResponse).rate) {
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
                                                personRate: r2.rate
                                            });
                                            const err = new Error(this.props.tr("movie-fetchinfo-err-emptyusers"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetMovieInfoForSignedResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r2.users,
                                            movie: r2.movie,
                                            personRate: r2.rate
                                        });
                                        break;
                                    default:
                                        break;
                                }

                            } else {
                                const r3 = r as GetMovieInfoResponse;
                                console.log("my rate second: ", this.state.personRate);
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

    onSearchChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchText: e.target.value
        })
    }

    onSearchSubmit = (): void => {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.searchMovie(this.state.searchText)
            .then(resp => {
                if (resp) {
                    resp.json()
                        .then((resp: SearchMovieResponse) => {
                            switch (resp.result) {
                                case SearchMovieResponseResult.failed:
                                    {
                                        const err = new Error(this.props.tr("movie-search-err-failed"));
                                        this.showAndHideAlert(err, Constants.waitNormal);
                                    }
                                    break;
                                case SearchMovieResponseResult.listEmpty:
                                    {
                                        const err = new Error(this.props.tr("movie-search-err-nomovie"));
                                        this.showAndHideAlert(err, Constants.waitNormal);
                                    }
                                    break;
                                case SearchMovieResponseResult.success:
                                    this.setState({
                                        isLoading: false,
                                        searchText: "",
                                        searchResult: resp.movies
                                    });
                                    break;
                                default:
                                    break;
                            }
                        })
                }
            })
    }

    onSelectMovie(imdbId: string) {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.getMovieId(imdbId)
            .then(resp => {
                if (resp) {
                    resp.json()
                        .then((resp: string) => {
                            this.props.history.push("movie/" + resp);
                            // switch (resp.result) {
                            //     case SearchMovieResponseResult.failed:
                            //         {
                            //             const err = new Error(this.props.tr("movie-search-err-failed"));
                            //             this.showAndHideAlert(err, Constants.waitNormal);
                            //         }
                            //         break;
                            //     case SearchMovieResponseResult.listEmpty:
                            //         {
                            //             const err = new Error(this.props.tr("movie-search-err-nomovie"));
                            //             this.showAndHideAlert(err, Constants.waitNormal);
                            //         }
                            //         break;
                            //     case SearchMovieResponseResult.success:
                            //         this.props.history.push(imdbId);
                            //         break;
                            //     default:
                            //         break;
                            // }
                        })
                }
            });
    }

    render(): JSX.Element {

        return (
            <Fragment>
                <InputGroup style={{ visibility: this.props.searchMode ? "visible" : "hidden" }}>
                    <InputGroupAddon addonType="prepend">
                        <Button className="fa fa-search fa-lg"
                            onClick={this.onSearchSubmit}></Button>
                    </InputGroupAddon>
                    <Input
                        onChange={this.onSearchChange}
                        placeholder={this.props.tr("movie-search-placeholder")} />
                </InputGroup>
                <div style={{ visibility: this.props.isLoggedin && !this.props.searchMode ? "visible" : "hidden", margin: "auto" }}
                    onClick={this.toggleModal}>
                    <span className={this.state.personRate > 0 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 1 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 2 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 3 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 4 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                </div>
                <div style={{ visibility: this.props.searchMode ? "hidden" : "visible" }}>
                    <h1 style={{ margin: "auto" }}>{this.state.movie.title}</h1>
                    <h3>{this.state.movie.year}</h3>
                    <h2>{this.state.movie.genre?.join(" ,")}</h2>
                    <h2>{this.state.movie.cast?.join(" ,")}</h2>
                    <h2>{this.state.movie.director?.join(" ,")}</h2>
                    <h5>{this.state.movie.brief}</h5>
                    <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                            <h5>Please Rate The Movies According To The Chart</h5>
                        </ModalHeader>
                        <ModalBody>
                            <RateModal type={ModalTypes.movies} changeRate={this.changeRate} />
                        </ModalBody>
                    </Modal>
                    <h3 style={{ visibility: this.state.mainList.length > 0 ? "visible" : "hidden" }}>
                        {this.props.tr("movie-users-title")}
                    </h3>
                    {this.state.mainList.map((userRated) => {
                        return (
                            <div key={userRated._id}>{userRated.name} : {userRated.rate} </div>
                        );
                    }
                    )}
                </div>
                <div style={{ visibility: this.props.searchMode ? "visible" : "hidden" }}>
                    {this.state.searchResult.map((ms) => {
                        return (
                            <div key={ms.imdbID} onClick={() => this.onSelectMovie(ms.imdbID)}>
                                <img src={ms.Poster} className="search_img" />{ms.Title} ({ms.Year})</div>
                        );
                    })}
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger">{this.state.error?.message}</Alert>
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.tr} />
                </div>
            </Fragment>
        );
    }
}


export default withRouter(MovieComponent);