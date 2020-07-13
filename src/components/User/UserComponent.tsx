// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { MovieRate } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FindForUserResponse } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { RateModal, ModalTypes } from '../Rate/RateComponent';
import { myFetch, ReqTypes } from '../../shared/my-fetch';

type RouteParams = {
    id: string;
}

type MyState = {
    isLoading: boolean;
    mainList: MovieRate[];
    alertIsOpen: boolean;
    error: Error;
    name: string;
    modalIsOpen: boolean;
    rate: number;
}

type MyProps = {
    isLoggedin: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

class UserComponent extends Component<RouteComponentProps<RouteParams> & MyProps, MyState>{

    constructor(props: RouteComponentProps<RouteParams> & MyProps) {
        super(props);
        this.state = {
            isLoading: false,
            alertIsOpen: false,
            name: "",
            error: new Error,
            mainList: [],
            modalIsOpen: false,
            rate: 0
        }
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.changeRate = this.changeRate.bind(this);
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

    toggleModal(): void {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    changeRate(newRate: number) {
        //TODO sent new rate
        this.toggleModal();
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
                    <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                            <h5>Please Rate The User According To The Chart</h5>
                        </ModalHeader>
                        <ModalBody>
                            <RateModal type={ModalTypes.people} changeRate={this.changeRate} />
                        </ModalBody>
                    </Modal>
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
                <div style={{ visibility: this.props.isLoggedin ? 'hidden' : 'visible' }}>
                    <Button onClick={this.toggleModal}>modal up</Button>
                </div>
            </Fragment>
        );
    }
}


export default withRouter(UserComponent);