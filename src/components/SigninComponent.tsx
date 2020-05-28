import { Component } from "react";
import { Row, Label, Button, Form } from "reactstrap";
import React from "react";
import { Formik, Field } from 'formik';
import { signinState } from '../shared/StateTypes';
import * as yup from "yup";

type myProps = {
    postSignin: (f: signinState) => void,
    username?: string
}


class SigninComponent extends Component<myProps> {

    constructor(props: myProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    init: signinState = ({
        email: "",
        password: "",
        username: ""
    });

    handleSubmit(values: signinState) {
        console.log("we get 1 with", values);
        this.props.postSignin(values);
    }


    render() {
        return (
            <div className="container">
                <Formik initialValues={this.init} onSubmit={values => {
                    console.log("we get 0 with", values);
                    this.handleSubmit(values);
                }} validationSchema={mySchema}>
                    {({ values, handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="username">User Name</Label>
                                <Field type="text" className="form-control"
                                    placeholder="choose a username" id="username"
                                    name="username" />
                                <div style={{ visibility: errors.username && touched.username ? 'visible' : 'hidden', height: 40 }}
                                    className="error-msg"> {errors.username}
                                </div>
                            </Row>
                            <Row className="form-group" >
                                <Label htmlFor="email">Email</Label>
                                <Field type="text" className="form-control"
                                    placeholder="enter your email" name="email" id="email" />
                                <div style={{ visibility: errors.email && touched.email ? 'visible' : 'hidden', height: 40 }}
                                    className="error-msg"> {errors.email}
                                </div>
                            </Row>
                            <Row className="form-group" name="password">
                                <Label htmlFor="password">Password</Label>
                                <Field type="password" className="form-control" name="password"
                                    placeholder="choose a password" id="password" />
                                <div style={{ visibility: errors.password && touched.password ? 'visible' : 'hidden', height: 40 }}
                                    className="error-msg"> {errors.password}
                                </div>
                            </Row>
                            <Button type="submit" className="btn">Submit</Button>
                        </Form>
                    )}
                </Formik>
                <h1 >{this.props.username}</h1>
            </div>
        );
    }

}

const mySchema = yup.object().shape({
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid email")
        .required(),
    username: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
    password: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
});

export default SigninComponent;