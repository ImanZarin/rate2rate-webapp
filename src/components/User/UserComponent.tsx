// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import { MovieRate } from '../../shared/StateTypes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GetUserInfoResponse, GetUserInfoForSignedResponse, IUser } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RateModal, ModalTypes } from '../Rate/RateComponent';
import './user.scss';
import { MyFetch } from '../../shared/my-fetch';

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
    personRate: number;
}

type MyProps = {
    isLoggedin: boolean;
    mUser: IUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

class UserComponent extends Component<RouteComponentProps<RouteParams> & MyProps, MyState>{

    myfetchObjet = new MyFetch();

    constructor(props: RouteComponentProps<RouteParams> & MyProps) {
        super(props);
        this.state = {
            isLoading: false,
            alertIsOpen: false,
            name: "",
            error: new Error,
            mainList: [],
            modalIsOpen: false,
            personRate: 0
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
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.rateUser(newRate, this.props.match.params.id)
            .then(response => {
                this.toggleModal();
                if (response.ok) {
                    response.json()
                        .then((r: IUser) => {
                            this.setState({
                                isLoading: false,
                                personRate: r.bodies.filter(x => x.bodyUserId == this.props.match.params.id)[0].rate
                            });
                        })
                        .catch((er: Error) => {
                            this.showAndHideAlert(er);
                        })
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    this.showAndHideAlert(error);
                }
            }, error => {
                this.toggleModal();
                this.showAndHideAlert(error);
            })
            .catch(error => {
                this.showAndHideAlert(error);
                this.toggleModal();
            });
    }

    fetchList = (userId: string): void => {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.getUserInfo(userId)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((r: GetUserInfoResponse | GetUserInfoForSignedResponse) => {
                            if ((r as GetUserInfoForSignedResponse).userAndMovies) {
                                const r2 = r as GetUserInfoForSignedResponse;
                                this.setState({
                                    isLoading: false,
                                    mainList: r2.userAndMovies.movies,
                                    name: r2.userAndMovies.user.username,
                                    personRate: r2.rate
                                });
                            } else {
                                const r3 = r as GetUserInfoResponse;
                                this.setState({
                                    isLoading: false,
                                    mainList: r3.movies,
                                    name: r3.user.username
                                });
                            }

                        })
                        .catch((er: Error) => {
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
                <div style={{ visibility: this.props.isLoggedin ? "visible" : "hidden", margin: "auto" }}
                    onClick={this.toggleModal}>
                    <span className={this.state.personRate > 0 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 1 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 2 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 3 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                    <span className={this.state.personRate > 4 ? "filled_star fa fa-star" : "empty_star fa fa-star"} />
                </div>
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