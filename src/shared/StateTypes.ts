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

export interface MovieRate {
    movie: string,
    rate: number
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
