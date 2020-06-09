import { ActionTypes, MyActions } from '../shared/ActionTypes';
import { signinForm } from '../shared/StateTypes';
import { Constants } from '../shared/Constants';
import { Dispatch } from 'redux';


export const updateSigninForm = (values: signinForm): MyActions => {
    return {
        type: ActionTypes.SIGNIN_UPDATE_FORM,
        payload: values
    }
}

export const postSignin = (values: signinForm) =>
    (dispatch: Dispatch<MyActions>): Promise<MyActions> => {
        dispatch(updateSigninForm(values));
        dispatch(signinLoading());
        return fetch(Constants.baseUrl + 'users/signup', {
            method: "PUT",
            body: JSON.stringify(values),
            headers: {
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

export const signinLoading = (): MyActions => {
    return {
        type: ActionTypes.SIGNIN_LOADING,
    }
}

export const signedin = (r: Response): MyActions => {
    return {
        type: ActionTypes.SIGNIN_SUCCESS,
        payload: r
    }
}

export const signinFailed = (e: Error): MyActions => {
    return {
        type: ActionTypes.SIGNIN_FAILED,
        payload: e,
    }
}