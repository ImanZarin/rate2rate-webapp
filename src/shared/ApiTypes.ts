import { MovieRate } from "./StateTypes";

export interface FindForUserResponse {
    user: {
        _id: string;
        name: string;
    },
    movies: MovieRate[],
}
