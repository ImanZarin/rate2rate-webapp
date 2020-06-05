import { Component } from "react";
import React from "react";
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
import SigninComponent from "./SigninComponent";
import { postSignin, signinLoading } from '../actions/signinAction';
import { signinForm } from "../shared/StateTypes";
import { MyActions } from "../shared/ActionTypes";
import { Dispatch } from 'redux';
import { HeaderComponent } from "./HeaderComponent";
import { rootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';

interface StateProps extends rootState {
    translate: any,
}

const mapStateToProps = (state: StateProps) => ({
    signin: state.signin,
});

interface DispatchProps {
    postSignin: (values: signinForm) => void,

}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, MyActions>): DispatchProps => ({
    postSignin: (values: signinForm) => dispatch(postSignin(values)),
});


type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;


class MainComponent extends Component<MyProps> {



    constructor(props: MyProps) {
        super(props);
    }


    render() {
        console.log(this.props.signin);
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