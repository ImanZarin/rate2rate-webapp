import { MyActions, ActionTypes } from '../../shared/ActionTypes';

export const signinSuccess = (username: string): MyActions => {
    return {
        type: ActionTypes.signinSuccess,
        payload: username
    }
}

export const tokenChange = (token: string): MyActions => {
    return {
        type: ActionTypes.tokenChange,
        payload: token
    }
}

export const logout = (): MyActions => {
    return {
        type: ActionTypes.logout
    }
}

