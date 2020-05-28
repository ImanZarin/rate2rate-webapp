import { Component } from "react";
import { Row, Label, Button } from "reactstrap";
import React from "react";
import { LocalForm, Control } from 'react-redux-form';
import { signinState } from '../shared/StateTypes';

type myProps = {
    postSignin: (f: signinState) => void,
    username?: string
}

class SigninComponent extends Component<myProps> {

    constructor(props: myProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values: signinState) {
        this.props.postSignin(values);
    }


    render() {
        return (
            <div className="container">
                <LocalForm onSubmit={this.handleSubmit}>
                    <Row className="form-group">
                        <Label htmlFor="username">User Name</Label>
                        <Control.text model=".username" className="form-control"
                            placeholder="choose a username" id="username" name="username" />
                    </Row>
                    <Row className="form-group" name="email">
                        <Label htmlFor="email">Email</Label>
                        <Control.text model=".email" className="form-control" placeholder="enter your email" />
                    </Row>
                    <Row className="form-group" name="password">
                        <Label htmlFor="password">Password</Label>
                        <Control.text model=".password" className="form-control" placeholder="choose a password" />
                    </Row>
                    <Button type="submit">Submit</Button>
                </LocalForm>
                <h1 >{this.props.username}</h1>
            </div>
        );
    }

}

export default SigninComponent;