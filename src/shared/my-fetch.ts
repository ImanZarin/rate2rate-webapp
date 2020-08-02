import { SigninForm, SignupForm } from "./StateTypes";
import { MyStorage } from '../shared/Enums';
import { Constants } from "./Constants";

enum ReqTypes {
    put = "PUT",
    post = "POST",
    del = "DELETE",
    get = "GET"
}

const reqContent = "application/json";
const reqToken = localStorage.getItem(MyStorage.token);

export class MyFetch {

    private abortController = new AbortController();
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    private async myFetch(type: ReqTypes, address: string, mBody?: any): Promise<any> {
        const reqObj: RequestInit = {
            method: type,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": reqContent,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Authorization': 'Bearer ' + reqToken
            },
            credentials: "omit",
            signal: this.abortController.signal
        };
        
        if (mBody) {
            reqObj.body = JSON.stringify(mBody);
        }
        return fetch(Constants.baseUrl + address, reqObj);
    }

    public abort(): void{
        this.abortController.abort();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async login(values: SigninForm): Promise<any> {
        return this.myFetch(ReqTypes.post, "auth/login", values);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async signup(values: SignupForm): Promise<any> {
        return this.myFetch(ReqTypes.post, "auth/signup", values);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getUserInfo(userId: string): Promise<any> {
        return this.myFetch(ReqTypes.get, 'movieusers/user/' + userId, null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getMovieInfo(movieId: string): Promise<any> {
        return this.myFetch(ReqTypes.get, 'movieusers/movie/' + movieId, null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async rateUser(newRate: number, userId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, "users/" + userId, { rate: newRate });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async rateMovie(newRate: number, movieId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, "movieusers/" + movieId, { rate: newRate });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async searchMovie(movieName: string): Promise<any> {
        return this.myFetch(ReqTypes.post, "movies", { movie: movieName });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getMovieId(imdbId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, "movies", { imdbId: imdbId });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getProfileInfo(): Promise<any> {
        return this.myFetch(ReqTypes.get, "movieusers/profile", null);
    }

    public async getHomeMovies(): Promise<any> {
        return this.myFetch(ReqTypes.get, "movieusers/home", null);
    }
}
