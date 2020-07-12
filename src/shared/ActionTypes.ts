import { Languages } from './Enums';


export enum ActionTypes {
    signinUpdateForm = "SIGNIN_UPDATE_FORM",
    signinLoading = "SIGNIN_LOADING",
    signinSuccess = "SIGNIN_SUCCESS",
    signinFailed = "SIGNIN_FAILED",
    languageChange = "LANGUAGE_CHANGE",
    nameChange = "NAME_CHANGE",
    tokenChange = "TOKEN_CHANGE"
}

export type SigninSuccessAction = {
    type: ActionTypes;
    payload: string;
}

export type FailedAction = {
    type: ActionTypes;
    payload: Error;
}

export type ChangeLanguageAction = {
    type: ActionTypes;
    payload: Languages;
}

export type ChangeNameAction = {
    type: ActionTypes;
    payload: string;
}

export type ChangeTokenAction = {
    type: ActionTypes;
    payload: string;
}

export type MyActions = SigninSuccessAction | FailedAction | ChangeLanguageAction | ChangeNameAction
    | ChangeTokenAction;