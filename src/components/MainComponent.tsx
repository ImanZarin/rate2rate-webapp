import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
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
import { IUser } from "../shared/ApiTypes";

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
    changeUser: (u: IUser) => void;
    changeToken: (t: string) => void;
    logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MyActions>): DispatchProps => ({
    changeLanguage: (l: Languages): MyActions => dispatch(languageChange(l)),
    changeUser: (u: IUser): MyActions => dispatch(userChange(u)),
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
        }

    }

    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent
                    lan={this.props.header.lan}
                    mUser={this.props.header.user}
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
                <Route path="/home" component={(): JSX.Element => {
                    return (<div>
                        This is the test to make sure navigation works as expected!
                    </div>);
                }
                } />
                <Route path="/user/:id" component={(): JSX.Element =>
                    <UserComponent tr={this.props.translate}
                        isLoggedin={this.props.signin.isSignedin}
                        mUser={this.props.header.user} />} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));