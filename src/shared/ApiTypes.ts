import { MovieRate } from "./StateTypes";

export interface GetUserInfoResponse {
    user: IUser,
    movies: MovieRate[],
}

export interface GetUserInfoForSignedResponse {
    userAndMovies: GetUserInfoResponse,
    rate: number //if is signed in and rated this user
}

export interface LoginUserResponse {
    accessToken: string;
    user: IUser;
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

