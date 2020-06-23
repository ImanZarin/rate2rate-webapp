import { Languages } from "../../shared/Enums"
import { ActionTypes, MyActions } from "../../shared/ActionTypes"

export const languageChange = (l: Languages): MyActions => {
    return {
        type: ActionTypes.languageChange,
        payload: l
    }
}