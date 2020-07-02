// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { MovieRate } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert } from 'reactstrap';
import { FindForUserResponse } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type RouteParams = {
    id: string;
}

type MyState = {
    isLoading: boolean;
    mainList: MovieRate[];
    alertIsOpen: boolean;
    error: Error;
    name: string;
}

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

class UserComponent extends Component<RouteComponentProps<RouteParams> & MyProps , MyState>{

    constructor(props: RouteComponentProps<RouteParams> & MyProps) {
        super(props);
        this.state = {
            isLoading: false,
            alertIsOpen: false,
            name: "",
            error: new Error,
            mainList: []
        }
    }

    componentDidMount(): void {
        this.fetchList(this.props.match.params.id);
    }

    showAndHideAlert(e: Error): void {
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
        }, Constants.waitShort);
    }

    closeAlert(): void {
        this.setState({
            alertIsOpen: false
        });
    }

    fetchList = (userId: string): void => {
        this.setState({
            isLoading: true
        })
        fetch(Constants.baseUrl + 'movieusers/' + userId, {
            method: "GET",
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "text/html"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(r => {
                            const rConverted = r as FindForUserResponse;
                            this.setState({
                                isLoading: false,
                                mainList: rConverted.movies,
                                name: rConverted.user.name
                            });
                        })
                        .catch(er => {
                            this.showAndHideAlert(er);
                        })
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    this.showAndHideAlert(error);
                }
            },
                error => {
                    this.showAndHideAlert(error);
                })
            .catch(error => {
                this.showAndHideAlert(error);
            });
    }


    render(): JSX.Element {
        return (
            <Fragment>
                <div>
                    <h1 style={{ margin: "auto" }}>{this.state.name}</h1>
                    <h3>{this.props.tr("user-movies-title")}</h3>
                    {this.state.mainList.map((ratedmovie) => {
                        return (
                            <div key={ratedmovie._id}>{ratedmovie.title} : {ratedmovie.rate} </div>
                        );
                    }
                    )}
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


export default withRouter(UserComponent);