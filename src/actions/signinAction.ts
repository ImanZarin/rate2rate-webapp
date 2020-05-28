import {ActionTypes, MyActions} from '../shared/ActionTypes';
import { signinState } from '../shared/StateTypes';


export const postSigninForm = (values: signinState): MyActions => {
    return{
        type: ActionTypes["ADD-SIGNIN"],
        payload: values
    }
}