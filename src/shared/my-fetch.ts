import { Constants } from "./Constants";

export enum ReqAddresses {
    movie = "movies",
    user = "users",
    login = "auth/login"
}

export enum ReqTypes {
    put = "PUT",
    post = "POST",
    del = "DELETE",
    get = "GET"
}

export enum ReqContent {
    json = "application/json",
    string = "text/plain",
    image = "image/jpeg"
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export async function myFetch(type: ReqTypes, add: ReqAddresses, content: ReqContent, id?: string, body?: any, token?: string): Promise<any> {
    let mAddress: string = Constants.baseUrl + add;
    if (id)
        mAddress += "/" + id;
    if (body) {
        switch (content) {
            case ReqContent.json:
                return fetch(mAddress, {
                    method: type,
                    body: JSON.stringify(body),
                    headers: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "Content-Type": content,
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Authorization': 'Bearer ' + token
                    },
                    credentials: "omit"
                });
            case ReqContent.string:
            default:
                return fetch(mAddress, {
                    method: type,
                    body: body,
                    headers: {
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        "Content-Type": content,
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        'Authorization': 'Bearer ' + ""
                    },
                    credentials: "omit"
                });
        }
    }
    else {
        return fetch(mAddress, {
            method: type,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": content,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Authorization': 'Bearer ' + ""
            },
            credentials: "omit"
        });
    }
}