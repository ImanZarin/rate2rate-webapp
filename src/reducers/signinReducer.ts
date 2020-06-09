import { ActionTypes, MyActions, UpdateSigninAction, FailedAction } from "../shared/ActionTypes";
import { signinForm, signinReducerState } from '../shared/StateTypes';


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
        case ActionTypes.SIGNIN_UPDATE_FORM: {
            const a = action as UpdateSigninAction;
            return {
                ...state, form: a.payload, errMsg: "", isLoading: false
            };
        }
        case ActionTypes.SIGNIN_LOADING:
            return {
                ...state, isLoading: true, errMsg: ""
            };
        case ActionTypes.SIGNIN_FAILED: {
            const a = action as FailedAction;
            return {
                ...state, isLoading: false, errMsg: a.payload.message, form: {
                    email: state.form.email,
                    username: state.form.username,
                    password: ""
                }
            }
        }
        case ActionTypes.SIGNIN_SUCCESS:
            return {
                ...state, isLoading: false, errMsg: "", form: initForm
            }
        default:
            return state;
    }
}