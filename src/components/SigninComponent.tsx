import { Component } from "react";
import { Row, Label, Button, Form } from "reactstrap";
import React from "react";
import { Formik, Field } from 'formik';
import { signinForm } from '../shared/StateTypes';
import * as yup from "yup";
import "../styles/signin.scss";
import { Loading } from './LoadingComponent';

type myProps = {
    postSignin: (f: signinForm) => void,
    isloading: boolean,
    errMsg: string,
    form: signinForm,
    translate: any,
}


class SigninComponent extends Component<myProps> {

    constructor(props: myProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
    handleSubmit(values: signinForm) {
        if (!this.props.isloading)
            this.props.postSignin(values);
    }


    render() {
        return (
            <div className="container">
                <h1>{this.props.translate("signin-title")}</h1>
                <div>
                    <Formik initialValues={this.props.form} onSubmit={values => {
                        console.log("we get 0 with", values);
                        this.handleSubmit(values);
                    }} validationSchema={mySchema}>
                        {({ values, handleSubmit, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="username">{this.props.translate("signin-username-title")}</Label>
                                    <Field type="text" className="form-control"
                                        placeholder={this.props.translate("signin-username-placeholder")}
                                        id="username"
                                        name="username" />
                                    <div style={{ visibility: errors.username && touched.username ? 'visible' : 'hidden' }}
                                        className="error-msg"> {errors.username}
                                    </div>
                                </Row>
                                <Row className="form-group" >
                                    <Label htmlFor="email">{this.props.translate("signin-email-title")}</Label>
                                    <Field type="text" className="form-control"
                                        placeholder={this.props.translate("signin-email-placeholder")}
                                        name="email" id="email" />
                                    <div style={{ visibility: errors.email && touched.email ? 'visible' : 'hidden' }}
                                        className="error-msg"> {errors.email}
                                    </div>
                                </Row>
                                <Row className="form-group" name="password">
                                    <Label htmlFor="password">{this.props.translate("signin-password-title")}</Label>
                                    <Field type="password" className="form-control" name="password"
                                        placeholder={this.props.translate("signin-password-placeholder")} id="password" />
                                    <div style={{ visibility: errors.password && touched.password ? 'visible' : 'hidden' }}
                                        className="error-msg"> {errors.password}
                                    </div>
                                </Row>
                        <Button type="submit" className="btn">{this.props.translate("siginin-form-submit")}</Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div style={{ visibility: this.props.isloading ? 'visible' : 'hidden' }}>
                    <Loading tr={this.props.translate} />
                </div>
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