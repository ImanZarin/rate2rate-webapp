import { Languages } from "./Enums";
import { IUser } from "./ApiTypes";

export interface SigninForm {
    username: string,
    password: string,
    email: string
}

export interface SigninReducerState {
    isSignedin: boolean,
    token: string
}

export interface HeaderReducerState {
    lan: Languages,
    user: IUser
}

export interface MovieRate {
        _id: string;
        title: string;
        year: number;
        rate: number;
}

export interface Movie {
    _id: string;
    title: string;
    year: number;
    brief: string;
    imageUrl: string;
    genre: string[];
    cast: string[];
}

