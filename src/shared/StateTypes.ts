
export interface signinForm {
    username: string,
    password: string,
    email: string
}

export interface signinReducerState {
    errMsg: string,
    isLoading: boolean,
    form: signinForm
}