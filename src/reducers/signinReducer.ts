import { ActionTypes, MyActions, UpdateSigninAction, FailedAction, SuccessAction } from "../shared/ActionTypes";
import { signinForm, signinReducerState } from '../shared/StateTypes';
import { Reducer } from "redux";


const initForm: signinForm = {
    username: "",
    email: "",
    password: ""
}
export const initialSigninReducerState: signinReducerState = {
    errMsg: "",
    isLoading: false,
    form: initForm
}

export const SigninReducer = (state = initialSigninReducerState, action: MyActions): signinReducerState => {
    switch (action.type) {
        case ActionTypes.SIGNIN_UPDATE_FORM:
            const a1 = action as UpdateSigninAction;
            return {
                ...state, form: a1.payload, errMsg: "", isLoading: false
            };
        case ActionTypes.SIGNIN_LOADING:
            console.log("loading reducer is on 2");
            return {
                ...state, isLoading: true, errMsg: ""
            };
        case ActionTypes.SIGNIN_FAILED:
            const a2 = action as FailedAction;
            return {
                ...state, isLoading: false, errMsg: a2.payload.message, form: {
                    email: state.form.email,
                    username: state.form.username,
                    password: ""
                }
            }
        case ActionTypes.SIGNIN_SUCCESS:
            const a3 = action as SuccessAction;
            return {
                ...state, isLoading: false, errMsg: "", form: initForm
            }
        default:
            return state;
    }
}