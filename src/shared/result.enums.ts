export enum GetUserInfoResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
}

export enum GetUserInfoForSignedResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
}

export enum LoginUserResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    repetedEmail = "EMAIL_ALREADY_EXIST"
}

export enum UpdateBuddyResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    userIsBuddy = "USER_SAME_AS_BUDDY",

}

export enum GetMovieInfoResponseResult {
    success = "SUCCESS",
    movieNotFound = "MOVIE_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
    wrongUrl = "UNDEFINED_URL"
}

export enum GetMovieInfoForSignedResponseResult {
    success = "SUCCESS",
    movieNotFound = "MOVIE_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
    userFake = "User_NOT_RECOGNIZED",
    wrongUrl = "UNDEFINED_URL"
}

export enum UpdateMovieRateResponseResult {
    success = "SUCCESS",
    movieuserNotFound = "MOVIEUSER_NOT_FOUND"
}

export enum SearchMovieResponseResult {
    success = "SUCCESS",
    listEmpty = "EMPTY_LIST",
    failed = "FAIL"
}

export enum GetProfileInfoResponseResult {
    success = "SUCCESS",
    noMovie = "EMPTY_MOVIE_LIST",
    noBuddy = "EMPTY_BUDDY_LIST",
    noMovienoBuddy = "EMPTY_BOTH_LIST",
    noUser = "USER_NOT_FOUND"
}