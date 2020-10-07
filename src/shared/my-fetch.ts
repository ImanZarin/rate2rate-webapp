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
                //eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": reqContent,
                //eslint-disable-next-line @typescript-eslint/naming-convention
                'Authorization': 'Bearer ' + reqToken,
            },
            credentials: "omit",
            signal: this.abortController.signal,
        };
        if (mBody) {
            reqObj.body = JSON.stringify(mBody);
        }
        return fetch(Constants.apiBaseUrl + address, reqObj);
    }

    public abort(): void {
        this.abortController.abort();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async login(values: SigninForm): Promise<any> {
        return this.myFetch(ReqTypes.post, process.env.REACT_APP_ENDPOINT_USER_LOGIN || "", values);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async signup(values: SignupForm): Promise<any> {
        return this.myFetch(ReqTypes.post, process.env.REACT_APP_ENDPOINTS_USER_SIGNUP || "", values);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public async signinFB(profile: any, token: string): Promise<any> {
        return this.myFetch(ReqTypes.post, process.env.REACT_APP_ENDPOINTS_USER_SIGNIN_FB || "", { profile: profile, token: token });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    public async signinGoogle(profile: any, token: string): Promise<any> {
        return this.myFetch(ReqTypes.post, process.env.REACT_APP_ENDPOINTS_USER_SIGNIN_GOOGLE || "", { profile: profile, token: token });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getUserInfo(userId: string): Promise<any> {
        return this.myFetch(ReqTypes.get, (process.env.REACT_APP_ENDPOINTS_USER_GET || '') + userId, null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getMovieInfo(movieId: string): Promise<any> {
        return this.myFetch(ReqTypes.get, (process.env.REACT_APP_ENDPOINTS_MOVIE_GET_DB || '') + movieId, null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async rateUser(newRate: number, userId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, (process.env.REACT_APP_ENDPOINTS_USER_RATE || "") + userId, { rate: newRate });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async rateMovie(newRate: number, movieId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, (process.env.REACT_APP_ENDPOINTS_MOVIE_RATE || "") + movieId, { rate: newRate });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async search(word: string): Promise<any> {
        return this.myFetch(ReqTypes.post, process.env.REACT_APP_ENDPOINTS_SEARCH || "", { search: word });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getMovieId(imdbId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, process.env.REACT_APP_ENDPOINT_MOVIE_GET_IMDB || "", { imdbId: imdbId });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getProfileInfo(): Promise<any> {
        return this.myFetch(ReqTypes.get, process.env.REACT_APP_ENDPOINT_PROFILE || "", null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async getHomeMovies(): Promise<any> {
        return this.myFetch(ReqTypes.get, process.env.REACT_APP_ENDPOINT_HOME || "", null);
    }
}
