// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, Fragment } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Alert, Button } from "reactstrap";
import { GetProfileInfoResponse, IUser, UserRate } from "../../shared/ApiTypes";
import { MyFetch } from "../../shared/my-fetch";
import { Constants } from "../../shared/Constants";
import { GetProfileInfoResponseResult } from "../../shared/result.enums";
import { MovieRate } from "../../shared/StateTypes";
import './profile.scss';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { MyStorage } from "../../shared/Enums";

type MyState = {
    activeTab: number;
    myMovies: MovieRate[];
    profile: IUser;
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

class ProfileComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {

    _isMounted = false;
    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);

        this.state = {
            activeTab: 1,
            profile: {
                _id: "",
                admin: false,
                buddies: [{
                    buddyId: "",
                    rate: 0,
                    reateDate: ""
                }],
                email: "",
                password: "",
                username: "",
                insertDate: "",
                updateDate: ""
            },
            myMovies: [{
                _id: "",
                rate: 0,
                title: "",
                year: 0,
                rateDate: ""
            }],
            myBuddies: [{
                buddyId: "",
                rate: 0,
                rateDate: "",
                buddyName: ""
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
                                    if (this._isMounted)
                                        this.setState({
                                            profile: r.me,
                                            myMovies: r.movies,
                                            myBuddies: []
                                        });
                                    break;
                                case GetProfileInfoResponseResult.noMovie:
                                    if (this._isMounted)
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
                                    if (this._isMounted)
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
                this.showAndHideAlert(error, Constants.waitNormal);
            })
            .catch(err => {
                this.showAndHideAlert(err, Constants.waitNormal);
            })
    }

    onTabChange(n: number): void {
        if (n !== this.state.activeTab)
            if (this._isMounted)
                this.setState({
                    activeTab: n
                });
    }

    showAndHideAlert(e: Error, wait: number): void {
        if (this._isMounted)
            this.setState({
                error: e,
                alertIsOpen: true,
                isLoading: false
            });
        setTimeout(() => {
            if (this._isMounted)
                this.setState({
                    alertIsOpen: false,
                    isLoading: false
                });
        }, wait);
    }

    closeAlert(): void {
        if (this._isMounted)
            this.setState({
                alertIsOpen: false
            });
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 1 ? 'active my_tab' : "my_tab"}
                            onClick={() => { this.onTabChange(1); }}>
                            {this.props.tr("profile-tabs-movies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 2 ? 'active my_tab' : 'my_tab'}
                            onClick={() => { this.onTabChange(2); }}>
                            {this.props.tr("profile-tabs-bodies-title")}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={this.state.activeTab === 3 ? 'active my_tab' : 'my_tab'}
                            onClick={() => { this.onTabChange(3); }}>
                            {this.props.tr("profile-tabs-me-title")}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={1}>
                        {this.state.myMovies.map((movie) => {
                            return (
                                <Row key={movie._id} className="my_row"
                                    onClick={() => this.props.history.push("movie/" + movie._id)}>
                                    <Col sm="3">
                                        <div className="row_text">
                                            {movie.title}
                                        </div>
                                    </Col>
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
                        <h3 className="main_text"
                            style={{ visibility: this.state.myMovies.length < 1 ? "visible" : "hidden" }}>
                            {this.props.tr("profile-movie-maintext-nomovie")}
                        </h3>
                    </TabPane>
                    <TabPane tabId={2}>
                        {this.state.myBuddies.map((buddy) => {
                            return (
                                <Row key={buddy.buddyId} className="my_row"
                                    onClick={() => this.props.history.push("user/" + buddy.buddyId)}>
                                    <Col sm="3" className="row_text">{buddy.buddyName}</Col>
                                    <Col sm="3">
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
                    <TabPane tabId={3}>
                        <h3 className="main_text">{this.state.profile.username}</h3>
                        <Button onClick={() => { this.props.logout(); this.props.history.push("/home"); }}>
                            {this.props.tr("profile-logout-button")}
                        </Button>
                    </TabPane>
                </TabContent>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
            </Fragment>
        );
    }
}

export default withRouter(ProfileComponent);