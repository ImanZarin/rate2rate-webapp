import * as StateTypes from './StateTypes';
import { postSigninForm } from '../actions/signinAction';
import { type } from 'os';

export enum ActionTypes {
    "ADD-SIGNIN",
}

interface PostSigninAction {
    type: ActionTypes,
    payload: StateTypes.signinState
}


export type MyActions = PostSigninAction ;