import { MyActions, ActionTypes, ChangeLanguageAction } from "../../shared/ActionTypes";
import { Languages } from '../../shared/Enums';
import { HeaderReducerState } from "../../shared/StateTypes";

const initialState = {
    lan: Languages.en
}

export const HEADER_REDUCER = (state = initialState, action: MyActions): HeaderReducerState => {
    switch (action.type) {
        case ActionTypes.languageChange:
            {
                const a = action as ChangeLanguageAction;
                // console.log("header reducer is working too");
                return {
                    ...state, lan: a.payload
                };
            }
        default:
            return state;
    }
}