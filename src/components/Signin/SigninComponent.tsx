// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Label, Button, Form, Alert, Fade } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, Field } from 'formik';
import { SigninForm } from '../../shared/StateTypes';
import * as yup from "yup";
import "./signin.scss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import 'bootstrap/dist/css/bootstrap.css';
import { LoginUserResponse } from "../../shared/ApiTypes";
import { ReactCookieProps, withCookies } from 'react-cookie';

type MyProps = {
    changeName: (u: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}

interface MyProps2 extends ReactCookieProps {
    changeName: (u: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}

type MyState = {
    form: SigninForm;
    isLoading: boolean;
    error: Error;
    alertIsOpen: boolean;
}

const mySchema = yup.object().shape({
    // eslint-disable-next-line no-useless-escape
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid email")
        .required(),
    username: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
    password: yup.string().min(4, "min 4 char").max(50, "too long").required("required"),
});

const initForm: SigninForm = {
    username: "",
    email: "",
    password: ""
}

class SigninComponent extends Component<MyProps2, MyState> {


    constructor(props: MyProps) {
        super(props);
        this.state = {
            form: initForm,
            isLoading: false,
            error: new Error,
            alertIsOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
    }

    showAndHideAlert(e: Error): void {
        this.setState({
            error: e,
            alertIsOpen: true,
            isLoading: false
        });
        setTimeout(() => {
            this.setState({
                alertIsOpen: false,
                isLoading: false
            });
        }, Constants.waitShort);
    }

    handleSubmit(values: SigninForm): void {
        this.handleFormChange(values);
        if (!this.state.isLoading) {
            this.postSignin(values);
        }
    }

    closeAlert(): void {
        this.setState({
            alertIsOpen: false
        });
    }

    handleFormChange(values: SigninForm): void {
        this.setState({
            form: {
                email: values.email,
                password: "",
                username: values.username
            }
        });
    }

    postSignin = (values: SigninForm): void => {
        this.setState({
            isLoading: true
        })
        fetch(Constants.baseUrl + 'auth/login', {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json"
            },
            //credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(r => {
                            const rConverted = r as LoginUserResponse;
                            console.log("this is the cookie: ", this.props.cookies);
                            this.props.cookies?.set("Token", rConverted.accessToken);
                            this.props.changeName(rConverted.userName);
                            console.log("the access token is: ", this.props.cookies?.get("Token"));
                        }
                        )
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    this.showAndHideAlert(error);
                }
            },
                error => {
                    this.showAndHideAlert(error);
                })
            .catch(error => {
                this.showAndHideAlert(error);
            });
    }


    render(): JSX.Element {
        return (
            <div className="container">
                <h1>{this.props.translate("signin-title")}</h1>
                <div>
                    <Formik initialValues={this.state.form} onSubmit={(values): void => {
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
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.translate} />
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger">{this.state.error?.message}</Alert>
            </div>
        );
    }

}

export default withCookies(SigninComponent);