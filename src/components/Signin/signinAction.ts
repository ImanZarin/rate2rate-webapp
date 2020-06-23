import { MyActions, ActionTypes } from '../../shared/ActionTypes';

export const signinSuccess = (username: string): MyActions => {
    return {
        type: ActionTypes.signinSuccess,
        payload: username
    }
}

