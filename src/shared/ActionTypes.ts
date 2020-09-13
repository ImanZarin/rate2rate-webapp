import { Languages } from './Enums';
import { User } from './dto.models';


export enum ActionTypes {
    signinUpdateForm = "SIGNIN_UPDATE_FORM",
    signinLoading = "SIGNIN_LOADING",
    signinSuccess = "SIGNIN_SUCCESS",
    signinFailed = "SIGNIN_FAILED",
    languageChange = "LANGUAGE_CHANGE",
    userChange = "USER_CHANGE",
    tokenChange = "TOKEN_CHANGE",
    logout = "LOGOUT",
    pageChange = "PAGE_CHANGE"
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

export type ChangeUserAction = {
    type: ActionTypes;
    payload: User;
}

export type ChangeTokenAction = {
    type: ActionTypes;
    payload: string;
}

export type Logout = {
    type: ActionTypes;
}

export type ChangePageAction = {
    type: ActionTypes;
    payload: string;
}

export type MyActions = SigninSuccessAction | FailedAction | ChangeLanguageAction | ChangeUserAction
    | ChangeTokenAction | Logout | ChangePageAction;