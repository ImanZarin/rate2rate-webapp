export enum GetUserInfoResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
}

export enum GetUserInfoForSignedResponseResult {
    success = "SUCCESS",
    userNotFound = "USER_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
    userHimself = "USER_IS_HIMSELF"
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
}

export enum GetMovieInfoForSignedResponseResult {
    success = "SUCCESS",
    movieNotFound = "MOVIE_NOT_FOUND",
    listEmpty = "EMPTY_LIST",
    userFake = "User_NOT_RECOGNIZED",
    noRate = "USER_HAS_NOT_RATED"
}

export enum UpdateMovieRateResponseResult {
    success = "SUCCESS",
    movieuserNotFound = "MOVIEUSER_NOT_FOUND"
}

export enum SearchResponseResult {
    success = "SUCCESS",
    bothEmpty = "EMPTY_LISTS",
    noMovie = "NO_MOVIE",
    noUser = "NO_USER",
    failed = "FAIL"
}

export enum GetProfileInfoResponseResult {
    success = "SUCCESS",
    noMovie = "EMPTY_MOVIE_LIST",
    noBuddy = "EMPTY_BUDDY_LIST",
    noMovienoBuddy = "EMPTY_BOTH_LIST",
    noUser = "USER_NOT_FOUND"
}

export enum GetRecentRatesResponseResult {
    success = "SUCCESS",
    noMovie = "EMPTY_LIST",
}

export enum GetRecentRatesForSignedResponseResult{
    noMovie = "EMPTY_MOVIE_LIST",
    success = "SUCCESS",
    noSuggest = "EMPTY_SUGGEST_LIST"
}