import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SigninComponent from "./Signin/SigninComponent";
import { signinSuccess } from './Signin/signinAction';
import { MyActions } from "../shared/ActionTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderComponent } from "./Header/HeaderComponent";
import { RootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';
import { Languages } from "../shared/Enums";
import { languageChange } from "./Header/headerActions";
import UserComponent from "./User/UserComponent";

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
    signinSuccess: (username: string) => void;
    changeLanguage: (l: Languages) => void;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MyActions>): DispatchProps => ({
    signinSuccess: (username: string): MyActions => dispatch(signinSuccess(username)),
    changeLanguage: (l: Languages): MyActions => dispatch(languageChange(l))
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;


class MainComponent extends Component<MyProps> {


    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent lan={this.props.header.lan}
                    changeLan={this.props.changeLanguage} />
                <div>{this.props.translate("t2")}</div>
                <Route path="/signin" component={(): JSX.Element =>
                    <SigninComponent
                        translate={this.props.translate}
                        signinSuccess={this.props.signinSuccess}
                    />} />
                <Route path="/home" component={(): JSX.Element => {
                    return (<div>
                        This is the test to make sure navigation works as expected!
                    </div>);
                }
                } />
                <Route path="/user/:id" component={(): JSX.Element => 
                <UserComponent tr={this.props.translate} />} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));