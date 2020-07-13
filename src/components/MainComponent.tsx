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
import { HeaderComponent } from "./Header/HeaderComponent";
import { RootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';
import { Languages, MyCookies } from "../shared/Enums";
import { languageChange, nameChange } from "./Header/header-action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserComponent from "./User/UserComponent";
import { ReactCookieProps, withCookies } from "react-cookie";
import { tokenChange } from "./Signin/signin-action";

interface StateProps extends RootState, ReactCookieProps {
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
    changeName: (u: string) => void;
    changeToken: (t: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MyActions>): DispatchProps => ({
    changeLanguage: (l: Languages): MyActions => dispatch(languageChange(l)),
    changeName: (u: string): MyActions => dispatch(nameChange(u)),
    changeToken: (t: string): MyActions => dispatch(tokenChange(t))
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;

class MainComponent extends Component<MyProps> {

    //TODO initial language and name and change them in redux
    componentDidMount() {
        if (this.props.signin.token.length === 0 && this.props.cookies?.get(MyCookies.token)) {
            this.props.changeToken(this.props.cookies?.get(MyCookies.token));
        }
    }


    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent lan={this.props.header.lan}
                    username={this.props.header.username}
                    changeName={this.props.changeName}
                    changeLan={this.props.changeLanguage}
                    translate={this.props.translate} />
                <Route path="/signin" component={(): JSX.Element =>
                    <SigninComponent
                        translate={this.props.translate}
                        changeName={this.props.changeName}
                        changeToken={this.props.changeToken} 
                        isLoggedin={this.props.signin.isSignedin} />} />
                <Route path="/home" component={(): JSX.Element => {
                    return (<div>
                        This is the test to make sure navigation works as expected!
                    </div>);
                }
                } />
                <Route path="/user/:id" component={(): JSX.Element =>
                    <UserComponent tr={this.props.translate} isLoggedin={this.props.signin.isSignedin}/>} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withCookies(MainComponent)));