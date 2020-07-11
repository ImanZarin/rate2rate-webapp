import { MyActions } from "../../shared/ActionTypes";
import { SigninReducerState } from '../../shared/StateTypes';



export const initialSigninReducerState: SigninReducerState = {
    isSignedin: false
}

export const SIGNIN_REDUCER = (state = initialSigninReducerState, action: MyActions): SigninReducerState => {
    switch (action.type) {
        default:
            return state;
    }
}