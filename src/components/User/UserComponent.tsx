// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { MovieRate, Movie } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert } from 'reactstrap';

type MyState = {
    isLoading: boolean;
    mainList: Movie[];
    alertIsOpen: boolean;
    error: Error;
    name: string;
}

type MyProps = {
    userId: string;
    tr: any;
}

class UserComponent extends Component<MyProps, MyState>{

    constructor(props: MyProps) {
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
        this.fetchList("5ed666e4cc8ec8697817e314");
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
                    console.log("we got an ok respond", response);
                    const movies = response.json() as unknown as Movie[];
                    console.log("this is the json: ", movies);
                    this.setState({
                        isLoading: false,
                        mainList: movies
                    });
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
                    <h1>{this.props.tr("user-movies-title")}</h1>
                    {this.state.mainList.map((movie) => {
                        return (
                            <div>{movie.title}</div>
                        );
                    }
                    )}
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger">{this.state.error?.message}</Alert>
                <LOADING tr={this.props.tr} />
            </Fragment>
        );
    }
}


export default UserComponent;