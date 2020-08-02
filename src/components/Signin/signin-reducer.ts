import { MyActions, ActionTypes, ChangeTokenAction } from "../../shared/ActionTypes";
import { SigninReducerState } from '../../shared/StateTypes';
import { MyStorage } from "../../shared/Enums";



export const initialSigninReducerState: SigninReducerState = {
    isSignedin: undefined,
    token: ""
}

export const SIGNIN_REDUCER = (state = initialSigninReducerState, action: MyActions): SigninReducerState => {
    switch (action.type) {
        case ActionTypes.tokenChange: {
            const a = action as ChangeTokenAction;
            return {
                ...state, token: a.payload, isSignedin: true
            };
        }
        case ActionTypes.logout:
            localStorage.removeItem(MyStorage.token);
            return {
                ...state, token: "", isSignedin: false
            }
        default:
            return state;
    }
}