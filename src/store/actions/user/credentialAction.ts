export interface UserCredentialsPending {
    type: CredentialActionEnums.User_Credentials_Pending,
    payload: any
}

export interface UserCredentialsSuccess {
    type: CredentialActionEnums.User_Credentials_Success,
    payload: any
}

export interface UserCredentialsError {
    type: CredentialActionEnums.User_Credentials_Error,
    payload: any
}

export interface UserCredentialsLogout {
    type: CredentialActionEnums.User_Credentials_Logout,
    payload: any
}

export interface UpdateUserPincode {
    type: CredentialActionEnums.Update_User_Pincode,
    payload: any
}

export enum CredentialActionEnums {
    User_Credentials_Pending = 'User_Credentials_Pending',
    User_Credentials_Success = 'User_Credentials_Success',
    User_Credentials_Error = 'User_Credentials_Error',
    Update_User_Pincode = 'Update_User_Pincode',
    User_Credentials_Logout = 'User_Credentials_Logout'
}