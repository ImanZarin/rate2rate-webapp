import { Component } from "react";
import React from "react";
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
import SigninComponent from "./SigninComponent";
import { postSigninForm } from '../actions/signinAction';
import { signinState } from "../shared/StateTypes";
import { MyActions } from "../shared/ActionTypes";
import { Dispatch, bindActionCreators } from 'redux';
import { SigninReducer } from "../reducers/signinReducer";
import { rootState } from "../App";
import { HeaderComponent } from "./HeaderComponent";

interface StateProps {
    name?: string,
    translate: any,
}

const mapStateToProps = (state: rootState, myProps: MyProps) => {
    return {
        name: state.Signin.username
    }
};

interface DispatchProps {
    postSigninForm: (values: signinState) => void,

}

const mapDispatchToProps = (dispatch: Dispatch<MyActions>, myProps: MyProps): DispatchProps => ({
    postSigninForm: (values: signinState) => dispatch(postSigninForm(values))
});


type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;


class MainComponent extends Component<MyProps> {



    constructor(props: MyProps) {
        super(props);

    }


    render() {
        return (
            <div>
                <HeaderComponent />
                <div>{this.props.translate("t2")}</div>
                <Route path="/signin" component={() =>
                    <SigninComponent postSignin={this.props.postSigninForm}
                        username={this.props.name} translate={this.props.translate}/>} />
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));