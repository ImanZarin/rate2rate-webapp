import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { connect } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withRouter, RouteComponentProps, Route } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SigninComponent from "./Signin/SigninComponent";
import { MyActions } from "../shared/ActionTypes";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HeaderComponent } from "./Header/HeaderComponent";
import { RootState } from "../App";
import { ThunkDispatch } from 'redux-thunk';
import { Languages } from "../shared/Enums";
import { languageChange, nameChange } from "./Header/headerActions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import UserComponent from "./User/UserComponent";
import { Constants } from "../shared/Constants";
import { Button } from "reactstrap";

interface StateProps extends RootState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: StateProps) => ({
    signin: state.signin,
    header: state.header
});

interface DispatchProps {
    changeLanguage: (l: Languages) => void;
    changeName: (u: string) => void;

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, any, MyActions>): DispatchProps => ({
    changeLanguage: (l: Languages): MyActions => dispatch(languageChange(l)),
    changeName: (u: string): MyActions => dispatch(nameChange(u))
});


// eslint-disable-next-line @typescript-eslint/ban-types
type MyProps = DispatchProps & StateProps & RouteComponentProps<{}>;

class MainComponent extends Component<MyProps> {

    //TODO initial language and name and change them in redux

    updateMovie() {
        const values = {
            year: 2001,
            brief: "this has been changed from client"
        }
        fetch(Constants.baseUrl + 'movies/5eb466360884d346a82b58e5', {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(resp => {
            console.log("update movie respond: ", resp);
        }, err => { console.log("err type one: ", err) })
            .catch(err => { console.log("err type two: ", err) })
    }

    render(): JSX.Element {
        return (
            <div>
                <HeaderComponent lan={this.props.header.lan}
                    username={this.props.header.username}
                    changeName={this.props.changeName}
                    changeLan={this.props.changeLanguage}
                    translate={this.props.translate} />
                <Route path="/signin" component={(): JSX.Element =>
                    <SigninComponent
                        translate={this.props.translate}
                        changeName={this.props.changeName} />} />
                <Route path="/home" component={(): JSX.Element => {
                    return (<div>
                        This is the test to make sure navigation works as expected!
                    </div>);
                }
                } />
                <Route path="/user/:id" component={(): JSX.Element =>
                    <UserComponent tr={this.props.translate} />} />
                <Button onClick={this.updateMovie}>update movie Api test</Button>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));