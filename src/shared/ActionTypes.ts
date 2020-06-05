import * as StateTypes from './StateTypes';


export enum ActionTypes {
    "SIGNIN_UPDATE_FORM",
    "SIGNIN_LOADING",
    "SIGNIN_SUCCESS",
    "SIGNIN_FAILED",
}

 export type UpdateSigninAction = {
    type: ActionTypes,
    payload: StateTypes.signinForm
}

 export type LoadingSigninAction = {
    type: ActionTypes,
}

export type SuccessAction = {
    type: ActionTypes,
    payload: Response
}

export type FailedAction = {
    type: ActionTypes,
    payload: Error
}

export type MyActions = UpdateSigninAction | LoadingSigninAction | SuccessAction | FailedAction;