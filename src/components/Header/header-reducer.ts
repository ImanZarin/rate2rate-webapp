import { MyActions, ActionTypes, ChangeLanguageAction, ChangeUserAction } from "../../shared/ActionTypes";
import { Languages } from '../../shared/Enums';
import { HeaderReducerState } from "../../shared/StateTypes";
import { User } from "../../shared/dto.models";

const initUser: User = {
    username: "",
    id: "",
    email: "",
    buddies: [{
        buddyId: "",
        rate: 0,
        rateDate: "",
        buddyName: "",
        userId: "",
        userName: ""
    }],
}
const initialState = {
    lan: Languages.en,
    user: initUser
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
        default:
            return state;
    }
}