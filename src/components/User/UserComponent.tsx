// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { User, MovieRate } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert } from 'reactstrap';

type MyState = {
    isLoading: boolean;
    mainList: MovieRate[];
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
        this.setState({
            isLoading: false,
            alertIsOpen: false,
        })
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
        fetch(Constants.baseUrl + 'users/' + userId, {
            method: "GET",
            body: userId,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "text/html"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    const user = response.json() as unknown as User
                    this.setState({
                        isLoading: false,
                        mainList: user.movies,

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


    movieRate(movie: string, rate: number): JSX.Element {
        return (
            <div></div>
        );
    }


    render() {
        return (
            <Fragment>
                <div>
                    
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger">{this.state.error?.message}</Alert>
                <LOADING tr={this.props.tr} />
            </Fragment>
        );
    }
}


export default UserComponent;