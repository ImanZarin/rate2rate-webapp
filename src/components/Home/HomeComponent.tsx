// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
import { MyFetch } from '../../shared/my-fetch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Col, Alert } from 'reactstrap';
import './home.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MovieRate, MovieSuggest } from '../../shared/dto.models';
import { Constants } from '../../shared/Constants';
import { GetRecentRatesResponse, GetRecentRatesForSignedResponse } from '../../shared/ApiTypes';
import { GetRecentRatesResponseResult, GetMovieInfoForSignedResponseResult, GetRecentRatesForSignedResponseResult } from '../../shared/result.enums';

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
    user: string;
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

        setInterval(async () => this.myfetchObjet.getHomeMovies()
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
            <Fragment>
                <h3 style={{ visibility: this.state.suggestedMovies.length > 0 ? "visible" : "hidden" }}>
                    {this.props.tr("home-suggests-title")} {this.props.user}:
                </h3>
                {this.state.suggestedMovies.map((sug) => {
                    return (
                        <Row onClick={() => this.props.history.push("/movie/" + sug.movieId)}>
                            <Col sm={3}></Col>
                            <Col sm={3} className="list_movie">
                                {sug.movieTitle}
                            </Col>
                            <Col sm={3}>
                                {(Math.round(sug.likeability * 100) / 100).toFixed(0)}%
                            </Col>
                            <Col sm={3}></Col>
                        </Row>
                    );
                })}
                <h3>{this.props.tr("home-livelist-title")}</h3>
                {this.state.recentMovies.map((mu) => {
                    return (
                        <Row>
                            <Col sm={1}></Col>
                            <Col sm={3} onClick={() => this.props.history.push("/user" + mu.userId)}
                                className="list_user">
                                {mu.userName}
                            </Col>
                            <Col sm={4} onClick={() => this.props.history.push("/movie/" + mu.movieId)}
                                className="list_movie">
                                {mu.movieTitle}
                            </Col>
                            <Col sm={3}>
                                <span style={{ visibility: mu.rate > 0 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 1 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 2 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 3 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                                <span style={{ visibility: mu.rate > 4 ? "visible" : "hidden" }}
                                    className={"filled_star fa fa-star"} />
                            </Col>
                            <Col sm={1}></Col>
                        </Row>
                    );
                })}
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
            </Fragment>
        );
    }
}

export default withRouter(HomeComponent);