import { Languages } from "./Enums";

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
    username: string
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

