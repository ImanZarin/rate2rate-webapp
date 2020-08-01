// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GetUserInfoResponse, GetUserInfoForSignedResponse, UpdateBuddyResponse } from '../../shared/ApiTypes';
import { RouteComponentProps, withRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RateModal, ModalTypes } from '../Rate/RateComponent';
import './user.scss';
import { MyFetch } from '../../shared/my-fetch';
import { GetUserInfoResponseResult, GetUserInfoForSignedResponseResult, UpdateBuddyResponseResult } from '../../shared/result.enums';
import { MovieRate, User } from '../../shared/dto.models';

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
    mUser: User;
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
        //TODO redirect if the user is the signed user
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
        this.myfetchObjet.rateUser(newRate, this.props.match.params.id)
            .then(response => {
                this.toggleModal();
                if (response.ok) {
                    response.json()
                        .then((r: UpdateBuddyResponse) => {
                            switch (r.result) {
                                case UpdateBuddyResponseResult.success:
                                    this.setState({
                                        isLoading: false,
                                        personRate: r.user.buddies.filter(x => x.buddyId == this.props.match.params.id)[0].rate
                                    });
                                    break;
                                case UpdateBuddyResponseResult.userIsBuddy:
                                    {
                                        const err = new Error(this.props.tr("user-rating-err-sameppl"));
                                        this.showAndHideAlert(err, Constants.waitLong);
                                    }
                                    break;
                                case UpdateBuddyResponseResult.userNotFound:
                                    {
                                        const err = new Error(this.props.tr("user-rating-err-nouser"));
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

    fetchList = (userId: string): void => {
        this.setState({
            isLoading: true
        });
        this.myfetchObjet.getUserInfo(userId)
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then((r: GetUserInfoResponse | GetUserInfoForSignedResponse) => {
                            if ((r as GetUserInfoForSignedResponse).buddy) {
                                const r2 = r as GetUserInfoForSignedResponse;
                                switch (r2.result) {
                                    case GetUserInfoForSignedResponseResult.userNotFound:
                                        {
                                            const err = new Error(this.props.tr("user-fetchinfo-err-nouser"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetUserInfoForSignedResponseResult.listEmpty:
                                        {
                                            this.setState({
                                                name: r2.user.username,
                                                personRate: r2.buddy.rate
                                            });
                                            const err = new Error(this.props.tr("user-fetchinfo-err-emptymovies"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetUserInfoForSignedResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r2.movies,
                                            name: r2.user.username,
                                            personRate: r2.buddy.rate
                                        });
                                        break;
                                    default:
                                        break;
                                }

                            } else {
                                const r3 = r as GetUserInfoResponse;
                                switch (r3.result) {
                                    case GetUserInfoResponseResult.userNotFound:
                                        {
                                            const err = new Error(this.props.tr("user-fetchinfo-err-nouser"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetUserInfoResponseResult.listEmpty:
                                        {
                                            this.setState({
                                                name: r3.user.username
                                            });
                                            const err = new Error(this.props.tr("user-fetchinfo-err-emptymovies"));
                                            this.showAndHideAlert(err, Constants.waitNormal);
                                        }
                                        break;
                                    case GetUserInfoResponseResult.success:
                                        this.setState({
                                            isLoading: false,
                                            mainList: r3.movies,
                                            name: r3.user.username
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
                            <div key={ratedmovie.movieId}>{ratedmovie.movieTitle} : {ratedmovie.rate} </div>
                        );
                    }
                    )}
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.tr} />
                </div>
            </Fragment>
        );
    }
}


export default withRouter(UserComponent);