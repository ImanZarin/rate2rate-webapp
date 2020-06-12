import { ActionTypes, MyActions, UpdateSigninAction, FailedAction } from "../../shared/ActionTypes";
import { SigninReducerState } from '../../shared/StateTypes';



export const initialSigninReducerState: SigninReducerState = {
    errMsg: "",
    isLoading: false,
    form: {
        email: "",
        password: "",
        username: ""
    }
}

export const SIGNIN_REDUCER = (state = initialSigninReducerState, action: MyActions): SigninReducerState => {
    switch (action.type) {
        case ActionTypes.signinUpdateForm: {
            const a = action as UpdateSigninAction;
            return {
                ...state, form: a.payload, errMsg: "", isLoading: false
            };
        }
        case ActionTypes.signinLoading:
            return {
                ...state, isLoading: true, errMsg: ""
            };
        case ActionTypes.signinFailed: {
            const a = action as FailedAction;
            return {
                ...state, isLoading: false, errMsg: a.payload.message, form: {
                    email: state.form.email,
                    username: state.form.username,
                    password: ""
                }
            }
        }
        case ActionTypes.signinSuccess:
            return {
                ...state, isLoading: false, errMsg: "",
                form: {
                    email: "",
                    password: "",
                    username: ""
                }
            }
        default:
            return state;
    }
}