import { ActionTypes, MyActions } from "../shared/ActionTypes";
import { signinState } from '../shared/StateTypes';
import { Reducer } from "redux";

const initialState: signinState = {
    username: "",
    password: "",
    email: ""
}

export const SigninReducer = (state = initialState, action: MyActions): signinState => {
    switch (action.type) {
        case ActionTypes["ADD-SIGNIN"]:
            return {
                ...state, username: action.payload.username
                , password: action.payload.password
                , email: action.payload.email
            };
        default:
            return state;
    }
}