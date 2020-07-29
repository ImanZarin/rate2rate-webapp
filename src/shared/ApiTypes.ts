import { MovieRate } from "./StateTypes";
import {
    GetUserInfoResponseResult, GetUserInfoForSignedResponseResult, LoginUserResponseResult,
    UpdateBuddyResponseResult, GetMovieInfoResponseResult, GetMovieInfoForSignedResponseResult,
    UpdateMovieRateResponseResult, SearchMovieResponseResult, GetProfileInfoResponseResult, GetRecentRatesResponseResult
} from "./result.enums";

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

export interface UpdateBuddyResponse {
    result: UpdateBuddyResponseResult,
    user: IUser
}

export interface UpdateMovieRateResponse {
    result: UpdateMovieRateResponseResult,
    movieuser: IMovieUser
}

export interface IBuddy {
    buddyId: string;
    rate: number;
    reateDate: string;
}

export interface IUser {
    _id: string,
    username: string;
    email: string;
    admin: boolean;
    buddies: [IBuddy];
    password: string;
    insertDate: string;
    updateDate: string;
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
    insertDate: string;
    updateDate: string;
}

export interface IMovieUser {
    _id: string;
    userId: string;
    rate: number;
    movieId: string;
    insertDate: string;
    updateDate: string;
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
    buddyId: string;
    buddyName: string;
    rate: number;
    rateDate: string;
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

export interface GetProfileInfoResponse {
    result: GetProfileInfoResponseResult,
    movies: MovieRate[],
    buddies: UserRate[],
    me: IUser
}

export interface MovieUserNames {
    movieId: string;
    userId: string;
    movieTitle: string;
    userName: string;
    rate: number;
}

export interface GetRecentRatesResponse {
    result: GetRecentRatesResponseResult,
    movies: MovieUserNames[]
}