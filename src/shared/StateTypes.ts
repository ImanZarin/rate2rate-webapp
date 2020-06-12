import { Languages } from "./Enums";

export interface SigninForm {
    username: string,
    password: string,
    email: string
}

export interface SigninReducerState {
    errMsg: string,
    isLoading: boolean,
    form: SigninForm
}

export interface HeaderReducerState {
    lan: Languages
}