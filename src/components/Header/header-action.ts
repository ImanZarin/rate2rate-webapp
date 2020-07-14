import { Languages } from "../../shared/Enums"
import { ActionTypes, MyActions } from "../../shared/ActionTypes"
import { IUser } from "../../shared/ApiTypes"

export const languageChange = (l: Languages): MyActions => {
    return {
        type: ActionTypes.languageChange,
        payload: l
    }
}

export const userChange = (u: IUser): MyActions => {
    return {
        type: ActionTypes.userChange,
        payload: u
    }
}