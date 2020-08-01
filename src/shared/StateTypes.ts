import { Languages } from "./Enums";
import { User } from "./dto.models";

export interface SigninForm {
    username: string,
    usertag: string,
    password: string
}

export interface SignupForm {
    password: string,
    email: string
}

export interface LoginForm {
    username: string,//which actually should be filled by Email
    password: string
}

export interface SigninReducerState {
    isSignedin: boolean,
    token: string
}

export interface HeaderReducerState {
    lan: Languages,
    user: User
}
