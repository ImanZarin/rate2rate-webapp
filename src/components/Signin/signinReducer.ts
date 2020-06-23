import { ActionTypes, MyActions, SigninSuccessAction } from "../../shared/ActionTypes";
import { SigninReducerState } from '../../shared/StateTypes';



export const initialSigninReducerState: SigninReducerState = {
    username: ""
}

export const SIGNIN_REDUCER = (state = initialSigninReducerState, action: MyActions): SigninReducerState => {
    switch (action.type) {
        case ActionTypes.signinSuccess:{
            const a = action as SigninSuccessAction;
            return {
                ...state, username: a.payload
            }}
        default:
            return state;
    }
}