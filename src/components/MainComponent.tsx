// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from "react";
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SigninComponent from "./Signin/SigninComponent";
import { MyActions } from "../shared/ActionTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HeaderComponent from "./Header/HeaderComponent";
import { RootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';
import { Languages, MyStorage } from "../shared/Enums";
import { languageChange, userChange } from "./Header/header-action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserComponent from "./User/UserComponent";
import { tokenChange, logout } from "./Signin/signin-action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MovieComponent from "./Movie/MovieComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ProfileComponent from "./Profile/ProfileComponent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HomeComponent from "./Home/HomeComponent";
import { User } from "../shared/dto.models";

//interface StateProps extends RootState, ReactCookieProps {
interface StateProps extends RootState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: StateProps) => ({
    signin: state.signin,
    header: state.header
});

interface DispatchProps {
    changeLanguage: (l: Languages) => void;
    changeUser: (u: User) => void;
    changeToken: (t: string) => void;
    logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MyActions>): DispatchProps => ({
    changeLanguage: (l: Languages): MyActions => dispatch(languageChange(l)),
    changeUser: (u: User): MyActions => dispatch(userChange(u)),
    changeToken: (t: string): MyActions => dispatch(tokenChange(t)),
    logout: (): MyActions => dispatch(logout())
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;

class MainComponent extends Component<MyProps> {

    //TODO initial language and name and change them in redux
    componentDidMount() {
        if (this.props.signin.token.length === 0 && localStorage.getItem(MyStorage.token)) {
            const r = localStorage.getItem(MyStorage.token);
            if (!r)
                this.props.logout();
            else
                this.props.changeToken(r);
            if (localStorage.getItem(MyStorage.user)){
                console.log(JSON.parse(localStorage.getItem(MyStorage.user) || ""));
                this.props.changeUser(JSON.parse(localStorage.getItem(MyStorage.user) || "") as User);
            }
        }
        else
            this.props.logout();
    }

    render(): JSX.Element {
        if (this.props.signin.isSignedin === undefined)
            return (<div></div>);
        return (
            <div>
                <HeaderComponent
                    lan={this.props.header.lan}
                    user={this.props.header.user}
                    changeUser={this.props.changeUser}
                    changeLan={this.props.changeLanguage}
                    translate={this.props.translate}
                    isLoggedin={this.props.signin.isSignedin}
                    logout={this.props.logout} />
                <Route path="/signup" component={(): JSX.Element =>
                    <SigninComponent
                        translate={this.props.translate}
                        changeUser={this.props.changeUser}
                        changeToken={this.props.changeToken}
                        isLoggedin={this.props.signin.isSignedin} />} />
                <Route path="/signin" component={(): JSX.Element =>
                    <SigninComponent
                        translate={this.props.translate}
                        changeUser={this.props.changeUser}
                        changeToken={this.props.changeToken}
                        isLoggedin={this.props.signin.isSignedin} />} />
                <Route path="/home" component={(): JSX.Element =>
                    <HomeComponent
                        user={this.props.header.user}
                        tr={this.props.translate} />} />
                <Route path="/user/:id" component={(): JSX.Element =>
                    <UserComponent
                        tr={this.props.translate}
                        user={this.props.header.user}
                        isLoggedin={this.props.signin.isSignedin} />} />
                <Route path="/movie/:id" component={(): JSX.Element =>
                    <MovieComponent
                        tr={this.props.translate}
                        isLoggedin={this.props.signin.isSignedin}
                        logout={this.props.logout} />} />
                <Route path="/movie" component={(): JSX.Element =>
                    <MovieComponent
                        tr={this.props.translate}
                        isLoggedin={this.props.signin.isSignedin}
                        logout={this.props.logout} />} />
                <Route path="/profile" component={(): JSX.Element =>
                    <ProfileComponent
                        tr={this.props.translate}
                        logout={this.props.logout} />} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));