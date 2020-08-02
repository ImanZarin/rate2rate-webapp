import { GetUserInfoResponseResult, GetUserInfoForSignedResponseResult, LoginUserResponseResult, 
    UpdateBuddyResponseResult, GetMovieInfoResponseResult, GetMovieInfoForSignedResponseResult, UpdateMovieRateResponseResult, SearchMovieResponseResult, GetProfileInfoResponseResult } from "./result.enums";
import { MovieRate, UserRate, User, Movie, IMDBsearch } from "./dto.models";

export interface GetUserInfoResponse {
    result: GetUserInfoResponseResult,
    user: User,
    movies: MovieRate[],
}

export interface GetUserInfoForSignedResponse {
    result: GetUserInfoForSignedResponseResult,
    user: User,
    movies: MovieRate[],
    buddy: UserRate
}

export interface LoginUserResponse {
    result: LoginUserResponseResult,
    accessToken: string,
    user: User
}

export interface UpdateBuddyResponse {
    result: UpdateBuddyResponseResult,
    user: User
}

export interface GetMovieInfoResponse {
    result: GetMovieInfoResponseResult,
    movie: Movie,
    users: MovieRate[],
}

export interface GetMovieInfoForSignedResponse {
    result: GetMovieInfoForSignedResponseResult,
    movie: Movie,
    users: MovieRate[],
    myRate: MovieRate
}

export interface UpdateMovieRateResponse {
    result: UpdateMovieRateResponseResult,
    movieuser: MovieRate
}

export interface SearchMovieResponse {
    result: SearchMovieResponseResult,
    movies: IMDBsearch[]
}

export interface GetProfileInfoResponse {
    result: GetProfileInfoResponseResult,
    movies: MovieRate[],
    buddies: UserRate[],
    me: User
}