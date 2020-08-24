// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from 'react';
import './search.scss';
import { User, IMDBsearch } from '../../shared/dto.models';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Table, Alert } from 'reactstrap';
import { MyFetch } from '../../shared/my-fetch';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { isNullOrUndefined } from 'util';
import { SearchResponse } from '../../shared/ApiTypes';
import { SearchResponseResult } from '../../shared/result.enums';
import { Constants } from '../../shared/Constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

type MyStates = {
    movies: IMDBsearch[];
    users: User[];
    isLoading: boolean;
    error: Error;
    alertIsOpen: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class SearchComponent extends Component<RouteComponentProps<any> & MyProps, MyStates> {
    _isMounted = false;
    fetchObj = new MyFetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: RouteComponentProps<any> & MyProps) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            users: [],
            error: new Error,
            alertIsOpen: false
        };
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this._isMounted = true;
        if (!isNullOrUndefined(this.props.match.params.search)) {
            this.fetchSearch(this.props.match.params.search);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.fetchObj.abort();
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

    fetchSearch(word: string): void {
        this.setState({
            isLoading: true
        });
        this.fetchObj.search(word)
            .then(resp => {
                if (!this._isMounted)
                    return;
                if (resp.ok) {
                    resp.json()
                        .then((resp: SearchResponse) => {
                            switch (resp.result) {
                                case SearchResponseResult.failed:
                                    {
                                        const err = new Error(this.props.tr("search-err-failed"));
                                        this.showAndHideAlert(err, Constants.waitNormal);
                                    }
                                    break;
                                case SearchResponseResult.bothEmpty:
                                    {
                                        const err = new Error(this.props.tr("search-err-nomovie"));
                                        this.showAndHideAlert(err, Constants.waitNormal);
                                    }
                                    break;
                                case SearchResponseResult.noMovie:
                                case SearchResponseResult.noUser:
                                case SearchResponseResult.success:
                                    this.setState({
                                        isLoading: false,
                                        movies: resp.movies,
                                        users: resp.users
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
        this.fetchObj.getMovieId(imdbId)
            .then(resp => {
                if (resp) {
                    resp.json()
                        .then((resp: string) => {
                            this.props.history.push("/movie/" + resp);
                        })
                }
            });
    }

    render(): JSX.Element {
        if (this.state.isLoading)
            return (
                <div className="search-bg">
                    <LOADING tr={this.props.tr} />
                </div>);
        return (
            <div className="search-bg">
                <div className="section-movie"
                    style={{ display: this.state.movies?.length > 0 ? "block" : "none" }}>
                    <Table striped className="my-table" size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>{this.props.tr("search-movie-col2")}</th>
                                <th>{this.props.tr("search-movie-col3")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.movies?.map((ms) => {
                                return (
                                    <tr key={ms.imdbID} style={{ cursor: "pointer" }}
                                        onClick={() => this.onSelectMovie(ms.imdbID)}>
                                        <th scope="row">
                                            <img style={{ display: ms.Poster.length < 5 ? "none" : "block" }}
                                                src={ms.Poster} className="search-img" />
                                            <span style={{ display: ms.Poster.length < 5 ? "block" : "none" }}
                                                className="fa fa-film search-img" />
                                        </th>
                                        <td>{ms.Title}</td>
                                        <td>{ms.Year}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="section-user"
                    style={{ display: this.state.users?.length > 0 ? "block" : "none" }}>
                    <Table striped className="my-table" size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>{this.props.tr("search-user-col2")}</th>
                                <th>{this.props.tr("search-user-col3")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users?.map((u) => {
                                return (
                                    <tr key={u.id} style={{ cursor: "pointer" }}
                                        onClick={() => this.onSelectUser(u.id)}>
                                        <th scope="row"><span className="fa fa-user" /></th>
                                        <td>{u.username}</td>
                                        <td>{u.email}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="warning" className="myAlert">{this.state.error?.message}</Alert>
            </div>
        );

    }
    onSelectUser(id: string): void {
        this.props.history.push("/user/" + id);
    }

}

export default withRouter(SearchComponent);