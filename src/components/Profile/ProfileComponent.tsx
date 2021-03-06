// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Alert, Button } from "reactstrap";
import { GetProfileInfoResponse } from "../../shared/ApiTypes";
import { MyFetch } from "../../shared/my-fetch";
import { Constants } from "../../shared/Constants";
import { GetProfileInfoResponseResult } from "../../shared/result.enums";
import './profile.scss';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { MyStorage } from "../../shared/Enums";
import { MovieRate, User, UserRate } from "../../shared/dto.models";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MY_CARD } from "../Card/CardComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from "../LoadingComponent";

type MyState = {
    activeTab: number;
    myMovies: MovieRate[];
    profile: User;
    myBuddies: UserRate[];
    isLoading: boolean;
    alertIsOpen: boolean;
    error: Error;
}

type MyProps = {
    logout: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tr: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class ProfileComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {

    _isMounted = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);

        this.state = {
            activeTab: 1,
            profile: {
                id: "",
                buddies: [{
                    buddyId: "",
                    buddyName: "",
                    rate: 0,
                    rateDate: "",
                    userId: "",
                    userName: "",
                }],
                email: "",
                username: "",
            },
            myMovies: [{
                rate: 0,
                movieId: "",
                movieTitle: "",
                movieImg: "",
                rateDate: "",
                userId: "",
                userName: ""
            }],
            myBuddies: [{
                buddyId: "",
                rate: 0,
                rateDate: "",
                buddyName: "",
                userId: "",
                userName: ""
            }],
            alertIsOpen: false,
            error: new Error,
            isLoading: false
        };

        this.onTabChange = this.onTabChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
    }
    myFetch = new MyFetch();

    componentDidMount(): void {
        window.scrollTo(0, 0);
        this._isMounted = true;
        if (localStorage.getItem(MyStorage.token))
            this.fetchInfo();
        else
            this.props.history.push("/home");
    }

    componentWillUnmount(): void {
        this._isMounted = false;
        this.myFetch.abort();
    }

    fetchInfo(): void {
        this.myFetch.getProfileInfo()
            .then(resp => {
                if (!this._isMounted)
                    return;
                if (resp.ok) {
                    resp.json()
                        .then((r: GetProfileInfoResponse) => {
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
                                        myBuddies: []
                                    });
                                    break;
                                case GetProfileInfoResponseResult.noMovie:
                                    this.setState({
                                        profile: r.me,
                                        myMovies: [],
                                        myBuddies: r.buddies
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
                                        myMovies: r.movies,
                                        myBuddies: r.buddies
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
                if (!this._isMounted)
                    return;
                this.showAndHideAlert(error, Constants.waitNormal);
            })
            .catch(err => {
                if (!this._isMounted)
                    return;
                this.showAndHideAlert(err, Constants.waitNormal);
            })
    }

    onTabChange(n: number): void {
        if (n !== this.state.activeTab)
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
            <div className="profile-bg">
                <Nav tabs className="tabs">
                    <NavItem>
                        <NavLink className={this.state.activeTab === 1 ? 'my-tab-active' : "my-tab"}
                            onClick={() => { this.onTabChange(1); }}>
                            {this.props.tr("profile-tabs-movies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 2 ? 'my-tab-active' : 'my-tab'}
                            onClick={() => { this.onTabChange(2); }}>
                            {this.props.tr("profile-tabs-bodies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 3 ? 'my-tab-active' : 'my-tab'}
                            onClick={() => { this.onTabChange(3); }}>
                            {this.props.tr("profile-tabs-me-title")}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={1} className="tab-content">
                        <Row>
                            {this.state.myMovies.map((movie) => {
                                return (
                                    <MY_CARD key={movie.movieId}
                                        imgLink={"/movie/" + movie.movieId}
                                        imgUrl={movie.movieImg}
                                        title={movie.movieTitle}
                                        subtitle=""
                                        titleLink={"/movie/" + movie.movieId}
                                        rate={movie.rate}
                                        isPercent={false}
                                        likebility={0} />
                                );
                            })}
                        </Row>
                        <h3 style={{ visibility: this.state.myMovies.length < 1 ? "visible" : "hidden" }}>
                            {this.props.tr("profile-movie-maintext-nomovie")}
                        </h3>
                    </TabPane>
                    <TabPane tabId={2} className="tab-content">
                        {this.state.myBuddies.map((buddy) => {
                            return (
                                <Row key={buddy.buddyId} className="my_row"
                                    onClick={() => this.props.history.push("/user/" + buddy.buddyId)}>
                                    <Col xs={12} md={3} className="row_text">{buddy.buddyName}</Col>
                                    <Col xs={12} md={3}>
                                        <span style={{ visibility: buddy.rate > 0 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: buddy.rate > 1 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: buddy.rate > 2 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: buddy.rate > 3 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                        <span style={{ visibility: buddy.rate > 4 ? "visible" : "hidden" }}
                                            className={"filled_star fa fa-star"} />
                                    </Col>
                                </Row>
                            );
                        })}
                        <h3 className="main_text"
                            style={{ visibility: this.state.myBuddies.length < 1 ? "visible" : "hidden" }}>
                            {this.props.tr("profile-buddy-maintext-nobuddy")}
                        </h3>
                    </TabPane>
                    <TabPane tabId={3} className="tab-content">
                        <span className="fa fa-user user-icon" />
                        <Row className="profile-row">
                            <Col xs={6} md={3}>{this.props.tr("profile-myself-username")}:</Col>
                            <Col xs={6} md={3}>{this.state.profile.username}</Col>
                        </Row>
                        <Row className="profile-row">
                            <Col xs={6} md={3}>{this.props.tr("profile-myself-email")}:</Col>
                            <Col xs={6} md={3}>{this.state.profile.email}</Col>
                        </Row>
                        <Button className="my-btn"
                            onClick={() => { this.props.logout(); this.props.history.push("/home"); window.location.reload(); }}>
                            {this.props.tr("profile-logout-button")}
                        </Button>
                    </TabPane>
                </TabContent>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}
                </Alert>
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.tr} />
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileComponent);