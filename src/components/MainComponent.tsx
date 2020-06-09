import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SigninComponent from "./Signin/SigninComponent";
import { postSignin } from './Signin/signinAction';
import { SigninForm } from "../shared/StateTypes";
import { MyActions } from "../shared/ActionTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderComponent } from "./Header/HeaderComponent";
import { RootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';

interface StateProps extends RootState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: StateProps) => ({
    signin: state.signin,
});

interface DispatchProps {
    postSignin: (values: SigninForm) => void;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, MyActions>): DispatchProps => ({
    postSignin: (values: SigninForm): Promise<MyActions> => dispatch(postSignin(values)),
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;


class MainComponent extends Component<MyProps> {


    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent />
                <div>{this.props.translate("t2")}</div>
                <Route path="/signin" component={(): JSX.Element =>
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