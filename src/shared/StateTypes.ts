import { Languages } from "./Enums";

export interface SigninForm {
    username: string,
    password: string,
    email: string
}

export interface SigninReducerState {
    username: string
}

export interface HeaderReducerState {
    lan: Languages
}