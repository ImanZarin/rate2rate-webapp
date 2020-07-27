// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Label, Button, Form, Alert, Fade } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, Field } from 'formik';
import { SigninForm, SignupForm } from '../../shared/StateTypes';
import * as yup from "yup";
import "./signin.scss";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LOADING } from '../LoadingComponent';
import { Constants } from '../../shared/Constants';
import 'bootstrap/dist/css/bootstrap.css';
import { LoginUserResponse, IUser } from "../../shared/ApiTypes";
import { MyStorage } from "../../shared/Enums";
import { MyFetch } from "../../shared/my-fetch";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { LoginUserResponseResult } from "../../shared/result.enums";

interface MyProps {
    changeUser: (u: IUser) => void;
    changeToken: (t: string) => void;
    isLoggedin: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}

type MyState = {
    form: SigninForm;
    isLoading: boolean;
    error: Error;
    alertIsOpen: boolean;
    isSignUp: boolean;
}


const initForm: SigninForm = {
    username: "",
    usertag: "",
    password: ""
}

class SigninComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {


    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);
        this.state = {
            form: initForm,
            isLoading: false,
            error: new Error,
            alertIsOpen: false,
            isSignUp: props.match.path.endsWith("up")
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.closeAlert = this.closeAlert.bind(this);
        this.showAndHideAlert = this.showAndHideAlert.bind(this);
    }

    mySchema = yup.object().shape({
        username: yup.string()
            // eslint-disable-next-line no-useless-escape
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                this.props.translate("signin-form-error-email"))
            .required(this.props.translate("signin-form-error-require")),
        usertag: yup.string()
            .min(4, this.props.translate("signin-form-error-min"))
            .max(50, this.props.translate("signin-form-error-max")),
        password: yup.string()
            .min(4, this.props.translate("signin-form-error-min"))
            .max(50, this.props.translate("signin-form-error-max"))
            .required(this.props.translate("signin-form-error-require"))
    });


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
                username: values.username,
                password: "",
                usertag: values.usertag
            }
        });
    }

    postSignin = (values: SigninForm | SignupForm): void => {
        this.setState({
            isLoading: true
        });
        const mF = new MyFetch();
        if (this.state.isSignUp) {
            mF.signup(values as SignupForm)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then((r: LoginUserResponse) => {
                                switch (r.result) {
                                    case LoginUserResponseResult.userNotFound: {
                                        const error: Error = new Error(this.props.translate("sigin-login-err-nouser"));
                                        this.showAndHideAlert(error);
                                    }
                                        break;
                                    case LoginUserResponseResult.repetedEmail: {
                                        const error: Error = new Error(this.props.translate("sigin-signup-err-repetedemail"));
                                        this.showAndHideAlert(error);
                                    }
                                        break;
                                    case LoginUserResponseResult.success:
                                        localStorage.setItem(MyStorage.token, r.accessToken);
                                        localStorage.setItem(MyStorage.user, JSON.stringify(r.user));
                                        this.props.changeUser(r.user);
                                        this.props.changeToken(r.accessToken);
                                        //TODO redirect to profile                                            
                                        break;
                                    default:
                                        break;
                                }
                            }
                            )
                    } else {
                        response.json()
                            .then((response: { statusCode: number; message: string }) => {
                                const error: Error = new Error('Error ' + response.statusCode + ": " + response.message);
                                this.showAndHideAlert(error);
                            })
                    }
                },
                    error => {
                        this.showAndHideAlert(error);
                    })
                .catch(error => {
                    this.showAndHideAlert(error);
                });
        }
        else {
            mF.login(values as SigninForm)
                .then(response => {
                    if (response.ok) {
                        response.json()
                            .then((r: LoginUserResponse) => {
                                switch (r.result) {
                                    case LoginUserResponseResult.userNotFound: {
                                        const error: Error = new Error(this.props.translate("sigin-login-err-nouser"));
                                        this.showAndHideAlert(error);
                                    }
                                        break;
                                    case LoginUserResponseResult.success:
                                        localStorage.setItem(MyStorage.token, r.accessToken);
                                        localStorage.setItem(MyStorage.user, JSON.stringify(r.user));
                                        this.props.changeUser(r.user);
                                        this.props.changeToken(r.accessToken);
                                        //TODO redirect to profile                                            
                                        break;
                                    default:
                                        break;
                                }
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

    }

    updateMovie(): void {
        const values = {
            year: 2001,
            brief: "this has been changed from client throgh local storage"
        }
        //console.log("the access token is: ", this.props.cookies?.get("access_token"));
        fetch(Constants.baseUrl + 'movies/5eb466360884d346a82b58e5', {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json",
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Authorization": 'Bearer ' + localStorage.getItem(MyStorage.token),
                // eslint-disable-next-line @typescript-eslint/naming-convention
            },
            credentials: "omit"
        }).then(resp => {
            console.log("update movie respond: ", resp);
        }, err => { console.log("err type one: ", err) })
            .catch(err => { console.log("err type two: ", err) })
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h1>{this.state.isSignUp ? this.props.translate("signup-title") : this.props.translate("signin-title")}</h1>
                <div>
                    <Formik initialValues={this.state.form} onSubmit={(values): void => {
                        this.handleSubmit(values);
                    }} validationSchema={this.mySchema}>
                        {({ handleSubmit, errors, touched }): JSX.Element => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="form-group" style={{ display: this.state.isSignUp ? "block" : "none" }}>
                                    <Label htmlFor="usertag">{this.props.translate("signin-username-title")}</Label>
                                    <Field type="text" className="form-control"
                                        placeholder={this.props.translate("signin-username-placeholder")}
                                        id="usertag"
                                        name="usertag" />
                                    <div style={{ visibility: errors.usertag && touched.usertag ? 'visible' : 'hidden' }}
                                        className="error-msg"> {errors.usertag}
                                    </div>
                                </Row>
                                <Row className="form-group" >
                                    <Label htmlFor="username">{this.props.translate("signin-email-title")}</Label>
                                    <Field type="text" className="form-control"
                                        placeholder={this.props.translate("signin-email-placeholder")}
                                        name="username" id="username" />
                                    <div style={{ visibility: errors.username && touched.username ? 'visible' : 'hidden' }}
                                        className="error-msg"> {errors.username}
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
                                <Row>
                                    <Button type="submit" className="btn">{this.props.translate("siginin-form-submit")}</Button>
                                    <span className="offset-1">{this.state.isSignUp ? this.props.translate("signin-linkto-login") : this.props.translate("signin-linkto-signup")}</span>
                                    <Label className="link" onClick={() => { this.setState({ isSignUp: !this.state.isSignUp }) }}>
                                        {this.state.isSignUp ? this.props.translate("signin-title") : this.props.translate("signup-title")}
                                    </Label>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div style={{ visibility: this.state.isLoading ? 'visible' : 'hidden' }}>
                    <LOADING tr={this.props.translate} />
                </div>
                <Alert isOpen={this.state.alertIsOpen} toggle={this.closeAlert}
                    color="danger" className="myAlert">{this.state.error?.message}</Alert>
            </div>
        );
    }

}

export default withRouter(SigninComponent);