import { MyActions, ActionTypes, ChangeLanguageAction, ChangeUserAction, ChangePageAction } from "../../shared/ActionTypes";
import { Languages, MyStorage } from '../../shared/Enums';
import { HeaderReducerState } from "../../shared/StateTypes";
import { Constants } from "../../shared/Constants";

const initialState: HeaderReducerState = {
    lan: Languages.en,
    user: {
        id: "",
        username: "",
        email: "",
        buddies: []
    },
    prePage: ""
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
        case ActionTypes.userChange: {
            const a = action as ChangeUserAction;
            return {
                ...state, user: a.payload
            }
        }
        case ActionTypes.pageChange: {
            const a = action as ChangePageAction;
            return {
                ...state, prePage: a.payload
            }
        }
        case ActionTypes.logout: {
            localStorage.removeItem(MyStorage.token);
            localStorage.removeItem(MyStorage.user);
            return {
                ...state, user: {
                    id: "",
                    username: "",
                    email: "",
                    buddies: []
                }
            };
        }
        default:
            return state;
    }
}