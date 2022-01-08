export interface UserProfilePending {
    type: UserProfileActionEnum.User_Profile_Pending,
    payload: any
}

export interface UserProfileSuccess {
    type: UserProfileActionEnum.User_Profile_Success,
    payload: any
}

export interface UserProfileError {
    type: UserProfileActionEnum.User_Profile_Error,
    payload: any
}

export interface UserProfileUpdate {
    type: UserProfileActionEnum.User_Profile_Update,
    payload: any
}

export enum UserProfileActionEnum {
    User_Profile_Pending = 'User_Profile_Pending',
    User_Profile_Success = 'User_Profile_Success',
    User_Profile_Error = 'User_Profile_Error',
    User_Profile_Update = 'User_Profile_Update',
}
