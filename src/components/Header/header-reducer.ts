import { MyActions, ActionTypes, ChangeLanguageAction, ChangeNameAction } from "../../shared/ActionTypes";
import { Languages } from '../../shared/Enums';
import { HeaderReducerState } from "../../shared/StateTypes";

const initialState = {
    lan: Languages.en,
    username: ""
}

export const HEADER_REDUCER = (state = initialState, action: MyActions): HeaderReducerState => {
    switch (action.type) {
        case ActionTypes.languageChange:
            {
                const a = action as ChangeLanguageAction;
                return {
                    ...state, lan: a.payload
                };
            }
        case ActionTypes.nameChange: {
            const a = action as ChangeNameAction;
            return {
                ...state, username: a.payload
            }
        }
        default:
            return state;
    }
}