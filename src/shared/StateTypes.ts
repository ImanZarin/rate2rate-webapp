
export interface SigninForm {
    username: string,
    password: string,
    email: string
}

export interface SigninReducerState {
    errMsg: string,
    isLoading: boolean,
    form: SigninForm
}