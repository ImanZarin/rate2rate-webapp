import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Label, Button, Form } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, Field } from 'formik';
import { SigninForm } from '../shared/StateTypes';
import * as yup from "yup";
import "../styles/signin.scss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from './LoadingComponent';

type MyProps = {
    postSignin: (f: SigninForm) => void;
    isloading: boolean;
    errMsg: string;
    form: SigninForm;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}

const mySchema = yup.object().shape({
    // eslint-disable-next-line no-useless-escape
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid email")
        .required(),
    username: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
    password: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
});


class SigninComponent extends Component<MyProps> {

    constructor(props: MyProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(values: SigninForm): void {
        if (!this.props.isloading)
            this.props.postSignin(values);
    }


    render(): JSX.Element {
        return (
            <div className="container">
                <h1>{this.props.translate("signin-title")}</h1>
                <div>
                    <Formik initialValues={this.props.form} onSubmit={(values): void => {
                        this.handleSubmit(values);
                    }} validationSchema={mySchema}>
                        {({ handleSubmit, errors, touched }): JSX.Element => (
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
                    <LOADING tr={this.props.translate} />
                </div>
            </div>
        );
    }

}

export default SigninComponent;