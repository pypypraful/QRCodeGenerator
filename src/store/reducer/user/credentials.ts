import {
    CredentialActionEnums, UpdateUserPincode,
    UserCredentialsError, UserCredentialsLogout,
    UserCredentialsPending,
    UserCredentialsSuccess
} from "../../actions/user/credentialAction";
import {initialUserCredentials, UserCredentials} from "../../state/models/login";

export const setUserCredentials = (
    userCredentials: UserCredentials = initialUserCredentials,
    action: UserCredentialsPending | UserCredentialsSuccess | UserCredentialsError | UserCredentialsLogout | UpdateUserPincode
): UserCredentials => {
    switch (action.type) {
        case CredentialActionEnums.User_Credentials_Pending:
            return {...userCredentials, loading: true, error: null}
        case CredentialActionEnums.User_Credentials_Success:
            return {...userCredentials, loading: false, email: action.payload.email, phoneNumber: action.payload.phoneNumber, error: null}
        case CredentialActionEnums.User_Credentials_Error:
            return {...userCredentials, loading: false, error: action.payload.error}
        case CredentialActionEnums.User_Credentials_Logout:
            return {...userCredentials, loading: true, error: null}
        case CredentialActionEnums.Update_User_Pincode:
            if (action.payload.length > 6) return { ...userCredentials }
            return {...userCredentials, pincode: action.payload}
        default:
            return {...userCredentials}
    }
}