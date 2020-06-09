import { ActionTypes, MyActions } from '../shared/ActionTypes';
import { SigninForm } from '../shared/StateTypes';
import { Constants } from '../shared/Constants';
import { Dispatch } from 'redux';


export const updateSigninForm = (values: SigninForm): MyActions => {
    return {
        type: ActionTypes.signinUpdateForm,
        payload: values
    }
}

export const signinLoading = (): MyActions => {
    return {
        type: ActionTypes.signinLoading,
    }
}

export const signedin = (r: Response): MyActions => {
    return {
        type: ActionTypes.signinSuccess,
        payload: r
    }
}

export const signinFailed = (e: Error): MyActions => {
    return {
        type: ActionTypes.signinFailed,
        payload: e,
    }
}


export const postSignin = (values: SigninForm) =>
    (dispatch: Dispatch<MyActions>): Promise<MyActions> => {
        dispatch(updateSigninForm(values));
        dispatch(signinLoading());
        return fetch(Constants.baseUrl + 'users/signup', {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    return dispatch(signedin(response));
                } else {
                    const error: Error = new Error('Error ' + response.status + ': ' + response.statusText);
                    return dispatch(signinFailed(error));
                }
            },
                error => {
                    return dispatch(signinFailed(error));
                })
            .catch(error => {
                return dispatch(signinFailed(error));
            });
    }

