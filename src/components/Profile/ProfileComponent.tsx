// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Alert } from "reactstrap";
import { GetProfileInfoResponse, IUser, UserRate } from "../../shared/ApiTypes";
import { MyFetch } from "../../shared/my-fetch";
import { Constants } from "../../shared/Constants";
import { GetProfileInfoResponseResult } from "../../shared/result.enums";
import { MovieRate } from "../../shared/StateTypes";

type MyState = {
    activeTab: number;
    myMovies: MovieRate[];
    profile: IUser;
    isLoading: boolean;
    alertIsOpen: boolean;
    error: Error;
}

type MyProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

class ProfileComponent extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            activeTab: 1,
            profile: {
                _id: "",
                admin: false,
                buddies: [{
                    buddyId: "",
                    buddyName: "",
                    rate: 0,
                    timeStamp: ""
                }],
                email: "",
                password: "",
                username: ""
            },
            myMovies: [{
                _id: "",
                rate: 0,
                title: "",
                year: 0
            }],
            alertIsOpen: false,
            error: new Error,
            isLoading: false
        };

        this.onTabChange = this.onTabChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
    }

    componentDidMount(): void {
        this.fetchInfo();
    }

    fetchInfo(): void {
        const myFetch = new MyFetch();
        myFetch.getProfileInfo()
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                        .then((r: GetProfileInfoResponse) => {
                            console.log(r);
                            switch (r.result) {
                                case GetProfileInfoResponseResult.noMovienoBuddy:
                                    {
                                        const error: Error = new Error(this.props.tr("profile-fetch-err-emptylists"));
                                        this.showAndHideAlert(error, Constants.waitLong);
                                    }
                                    break;
                                case GetProfileInfoResponseResult.noBuddy:
                                    this.setState({
                                        profile: r.me,
                                        myMovies: r.movies,
                                    });
                                    break;
                                case GetProfileInfoResponseResult.noMovie:
                                    this.setState({
                                        profile: r.me,
                                        myMovies: []
                                    });
                                    break;
                                case GetProfileInfoResponseResult.noUser:
                                    {
                                        const error: Error = new Error(this.props.tr("profile-fetch-err-nouser"));
                                        this.showAndHideAlert(error, Constants.waitLong);
                                    }
                                    break;
                                case GetProfileInfoResponseResult.success:
                                    this.setState({
                                        profile: r.me,
                                        myMovies: r.movies
                                    });
                                    break;
                                default:
                                    break;
                            }
                        })
                }
                else {
                    const error: Error = new Error('Error ' + resp.status + ': ' + resp.statusText);
                    this.showAndHideAlert(error, Constants.waitShort);
                }
            }, error => {
                this.showAndHideAlert(error, Constants.waitNormal);
            })
            .catch(err => {
                this.showAndHideAlert(err, Constants.waitNormal);
            })
    }

    onTabChange(n: number): void {
        this.setState({
            activeTab: n
        });
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

    render(): JSX.Element {
        return (
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 1 ? 'active' : 'deactive'}
                            onClick={() => { this.onTabChange(1); }}>
                            {this.props.tr("profile-tabs-movies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 2 ? 'active' : 'deactive'}
                            onClick={() => { this.onTabChange(2); }}>
                            {this.props.tr("profile-tabs-bodies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 3 ? 'active' : 'deactive'}
                            onClick={() => { this.onTabChange(3); }}>
                            {this.props.tr("profile-tabs-me-title")}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent>
                    <TabPane>
                        {this.state.myMovies.map((movie) => {
                            return (
                                <Row key={movie._id}>
                                    <Col sm="3">{movie.title}</Col>
                                    <Col sm="3">
                                        <span style={{ visibility: movie.rate > 0 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: movie.rate > 1 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: movie.rate > 2 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: movie.rate > 3 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: movie.rate > 4 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                    </Col>
                                </Row>
                            );
                        })}
                        <h3 style={{ visibility: this.state.myMovies.length < 1 ? "visible" : "hidden" }}>
                            {this.props.tr("profile-movie-maintext-nomovie")}
                        </h3>
                    </TabPane>
                </TabContent>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
            </Fragment>
        );
    }
}

export default ProfileComponent;