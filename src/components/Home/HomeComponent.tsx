// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
import { MyFetch } from '../../shared/my-fetch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Col, Alert, Jumbotron } from 'reactstrap';
import './home.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MovieRate, MovieSuggest, User } from '../../shared/dto.models';
import { Constants } from '../../shared/Constants';
import { GetRecentRatesResponse, GetRecentRatesForSignedResponse } from '../../shared/ApiTypes';
import { GetRecentRatesResponseResult, GetRecentRatesForSignedResponseResult } from '../../shared/result.enums';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MY_CARD } from '../Card/CardComponent';

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
    user: User;
}

type MyState = {
    recentMovies: MovieRate[];
    suggestedMovies: MovieSuggest[];
    isLoading: boolean;
    error: Error;
    alertIsOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class HomeComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {
    myfetchObjet = new MyFetch();
    _isMounted = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);

        this.state = {
            recentMovies: [],
            suggestedMovies: [],
            isLoading: false,
            error: new Error,
            alertIsOpen: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this._isMounted = true;
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.getHomeMovies()
            .then(resp => {
                if (!this._isMounted)
                    return;
                if (resp.ok) {
                    resp.json()
                        .then((r: GetRecentRatesResponse | GetRecentRatesForSignedResponse) => {
                            if ((r as GetRecentRatesForSignedResponse).suggests) {
                                switch (r.result) {
                                    case GetRecentRatesForSignedResponseResult.noMovie: {
                                        this.setState({
                                            isLoading: false,
                                        });
                                        const error: Error = new Error(this.props.tr("home-fetch-err-nomovie"));
                                        this.showAndHideAlert(error, Constants.waitShort);
                                        break;
                                    }
                                    case GetRecentRatesForSignedResponseResult.noSuggest:
                                        this.setState({
                                            isLoading: false,
                                            recentMovies: r.movies
                                        });
                                        break;
                                    case GetRecentRatesForSignedResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            recentMovies: r.movies,
                                            suggestedMovies: r.suggests
                                        })
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else if (r as GetRecentRatesResponse) {
                                switch (r.result) {
                                    case GetRecentRatesResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            recentMovies: r.movies
                                        });
                                        break;
                                    case GetRecentRatesResponseResult.noMovie: {
                                        this.setState({
                                            isLoading: false,
                                        });
                                        const error: Error = new Error(this.props.tr("home-fetch-err-nomovie"));
                                        this.showAndHideAlert(error, Constants.waitShort);
                                        break;
                                    }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        })
                }
                else {
                    const error: Error = new Error('Error ' + resp.status + ': ' + resp.statusText);
                    this.showAndHideAlert(error, Constants.waitShort);
                }
            },
                error => {
                    if (!this._isMounted)
                        return;
                    this.showAndHideAlert(error, Constants.waitShort);
                })
            .catch(err => {
                if (!this._isMounted)
                    return;
                this.showAndHideAlert(err, Constants.waitShort);
            });

        setInterval(async () => {
            if (!this._isMounted)
                return;
            this.myfetchObjet.getHomeMovies()
                .then(resp => {
                    if (resp.ok) {
                        resp.json()
                            .then((r: GetRecentRatesResponse | GetRecentRatesForSignedResponse) => {
                                if ((r as GetRecentRatesForSignedResponse).result) {
                                    switch (r.result) {
                                        case GetRecentRatesForSignedResponseResult.success:
                                            if (this.state.suggestedMovies != r.suggests)
                                                this.setState({
                                                    suggestedMovies: r.suggests
                                                });
                                            break;
                                        case GetRecentRatesForSignedResponseResult.noSuggest:
                                        case GetRecentRatesForSignedResponseResult.noMovie:
                                        default:
                                            break;
                                    }
                                }
                                else if (r as GetRecentRatesResponse) {
                                    switch (r.result) {
                                        case GetRecentRatesResponseResult.success:
                                            if (this.state.recentMovies != r.movies)
                                                this.setState({
                                                    recentMovies: r.movies
                                                });
                                            break;
                                        case GetRecentRatesResponseResult.noMovie:
                                        default:
                                            break;
                                    }
                                }

                            })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
            , Constants.waitForNextFetch);
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

    render(): JSX.Element {
        return (
            <div className="home-bg" >
                <Jumbotron className="my-jumbotron">
                    <div>{this.props.tr("home-jumbo-title")}</div>
                    <span>{this.props.tr("home-jumbo-subtitle")}</span>
                </Jumbotron>
                <div className="first_section"
                    style={{ display: this.state.suggestedMovies?.length > 0 ? "block" : "none" }}>
                    <h3>
                        {this.props.tr("home-suggests-title")} {this.props.user.username}:
                    </h3>
                    <Row className="row_card">
                        {this.state.suggestedMovies?.map((sug) => {
                            return (
                                <MY_CARD key={sug.movieId}
                                    title={sug.movieTitle}
                                    titleLink={"/movie/" + sug.movieId}
                                    subtitle=""
                                    rate={0}
                                    imgUrl={sug.movieImg}
                                    imgLink={"/movie/" + sug.movieId}
                                    likebility={sug.likeability}
                                    isPercent={true} />
                            );
                        })}
                    </Row>
                </div>
                <div className="second_section">
                    <h3>{this.props.tr("home-livelist-title")}:</h3>
                    <Row className="row_card">
                        {this.state.recentMovies.map((mu) => {
                            return (
                                <MY_CARD key={mu.movieId + mu.userId}
                                    title={mu.userName}
                                    titleLink={"/user/" + mu.userId}
                                    subtitle={mu.movieTitle}
                                    rate={mu.rate}
                                    imgUrl={mu.movieImg}
                                    imgLink={"/movie/" + mu.movieId}
                                    isPercent={false}
                                    likebility={0} />
                            );
                        })}
                    </Row>
                </div>
                <div className="third_section">
                    <h3>{this.props.tr("home-about-title")}</h3>
                    <p>{this.props.tr("home-about-text")}</p>
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
            </div>
        );
    }
}

export default withRouter(HomeComponent);