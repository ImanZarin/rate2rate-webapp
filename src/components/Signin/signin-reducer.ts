import { MyActions, ActionTypes, ChangeTokenAction } from "../../shared/ActionTypes";
import { SigninReducerState } from '../../shared/StateTypes';



export const initialSigninReducerState: SigninReducerState = {
    isSignedin: false,
    token: ""
}

export const SIGNIN_REDUCER = (state = initialSigninReducerState, action: MyActions): SigninReducerState => {
    switch (action.type) {
        case ActionTypes.tokenChange:{
            const a = action as ChangeTokenAction;
            return {
                ...state, token: a.payload
            }
        }
        default:
            return state;
    }
}