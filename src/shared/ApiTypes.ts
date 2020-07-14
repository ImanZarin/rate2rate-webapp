import { MovieRate } from "./StateTypes";

export interface FindForUserResponse {
    user: {
        _id: string;
        name: string;
    },
    movies: MovieRate[],
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

