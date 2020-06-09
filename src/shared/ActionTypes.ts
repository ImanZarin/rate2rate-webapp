import * as StateTypes from './StateTypes';


export enum ActionTypes {
    signinUpdateForm = "SIGNIN_UPDATE_FORM",
    signinLoading = "SIGNIN_LOADING",
    signinSuccess = "SIGNIN_SUCCESS",
    signinFailed = "SIGNIN_FAILED",
}

 export type UpdateSigninAction = {
    type: ActionTypes;
    payload: StateTypes.SigninForm;
}

 export type LoadingSigninAction = {
    type: ActionTypes;
}

export type SuccessAction = {
    type: ActionTypes;
    payload: Response;
}

export type FailedAction = {
    type: ActionTypes;
    payload: Error;
}

export type MyActions = UpdateSigninAction | LoadingSigninAction | SuccessAction | FailedAction;