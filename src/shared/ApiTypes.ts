import { MovieRate } from "./StateTypes";
import { GetUserInfoResponseResult, GetUserInfoForSignedResponseResult, LoginUserResponseResult, UpdateBodyResponseResult, GetMovieInfoResponseResult, GetMovieInfoForSignedResponseResult, UpdateMovieRateResponseResult, SearchMovieResponseResult } from "./result.enums";

export interface GetUserInfoResponse {
    result: GetUserInfoResponseResult,
    user: IUser,
    movies: MovieRate[],
}

export interface GetUserInfoForSignedResponse {
    result: GetUserInfoForSignedResponseResult,
    user: IUser,
    movies: MovieRate[],
    rate: number //if is signed in and rated this user
}

export interface LoginUserResponse {
    result: LoginUserResponseResult;
    accessToken: string;
    user: IUser;
}

export interface UpdateBodyResponse {
    result: UpdateBodyResponseResult,
    user: IUser
}

export interface UpdateMovieRateResponse {
    result: UpdateMovieRateResponseResult,
    movieuser: IMovieUser
}

interface IBody {
    bodyUserId: string;
    rate: number;
}

export interface IUser {
    _id: string,
    username: string;
    email: string;
    admin: boolean;
    bodies: [IBody];
    password: string;
}

export interface IMovie {
    _id: string;
    title: string;
    year: number;
    brief: string;
    imageUrl: string;
    genre: string[];
    cast: string[];
    director: string[];
    imdbId: string;
}

export interface IMovieUser {
    _id: string;
    userId: string;
    rate: number;
    movieId: string;
}

export interface GetMovieInfoResponse {
    result: GetMovieInfoResponseResult,
    movie: IMovie,
    users: UserRate[],
}

export interface GetMovieInfoForSignedResponse {
    result: GetMovieInfoForSignedResponseResult,
    movie: IMovie,
    users: UserRate[],
    rate: number
}

export interface UserRate {
    _id: string;
    name: string;
    rate: number;
}

export interface IMDBsearch {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Title: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Year: number;
    imdbID: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Poster: string;
}

export interface SearchMovieResponse {
    result: SearchMovieResponseResult,
    movies: IMDBsearch[]
}