import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SigninComponent from "./SigninComponent";
import { postSignin } from '../actions/signinAction';
import { signinForm } from "../shared/StateTypes";
import { MyActions } from "../shared/ActionTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderComponent } from "./HeaderComponent";
import { rootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';

interface StateProps extends rootState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any,
}

const mapStateToProps = (state: StateProps) => ({
    signin: state.signin,
});

interface DispatchProps {
    postSignin: (values: signinForm) => void,

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, MyActions>): DispatchProps => ({
    postSignin: (values: signinForm) => dispatch(postSignin(values)),
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;


class MainComponent extends Component<MyProps> {


    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent />
                <div>{this.props.translate("t2")}</div>
                <Route path="/signin" component={() =>
                    <SigninComponent
                        isloading={this.props.signin.isLoading}
                        errMsg={this.props.signin.errMsg}
                        form={this.props.signin.form}
                        translate={this.props.translate}
                        postSignin={this.props.postSignin}
                    />} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));