import { Languages } from "../../shared/Enums"
import { ActionTypes, MyActions } from "../../shared/ActionTypes"
import { User } from "../../shared/dto.models"

export const languageChange = (l: Languages): MyActions => {
    return {
        type: ActionTypes.languageChange,
        payload: l
    }
}

export const userChange = (u: User): MyActions => {
    return {
        type: ActionTypes.userChange,
        payload: u
    }
}