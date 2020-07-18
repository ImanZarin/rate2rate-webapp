import { SigninForm } from "./StateTypes";
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
            credentials: "omit"
        };
        if (mBody) {
            reqObj.body = JSON.stringify(mBody);
        }
        return fetch(Constants.baseUrl + address, reqObj);
    }

    public async login(values: SigninForm): Promise<any> {
        return this.myFetch(ReqTypes.post, "auth/login", values);
    }

    public async getUserInfo(userId: string): Promise<any> {
        return this.myFetch(ReqTypes.get, 'movieusers/' + userId, null);
    }

    public async rateUser(newRate: number, userId: string): Promise<any> {
        return this.myFetch(ReqTypes.put, "users/" + userId, {rate: newRate});
    }
}
