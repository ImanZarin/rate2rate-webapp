import { ActionTypes } from '../shared/ActionTypes';
import { signinState } from '../shared/StateTypes';
import { Constants } from '../shared/Constants';
import { MyActions } from '../shared/ActionTypes';


export const postSigninForm = (values: signinState): MyActions => {
    return {
        type: ActionTypes["ADD-SIGNIN"],
        payload: values
    }
}

export const postSignin = (values: signinState): void => {
    fetch(Constants.baseUrl + 'users/signup', {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                console.log("successfully got ok", response);
                return response;
            } else {
                let error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                //error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .catch(error => {
            console.log('post form', error.message);
        });
}