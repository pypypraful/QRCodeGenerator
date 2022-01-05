import {
    CredentialActionEnums,
    UserCredentialsError, UserCredentialsLogout,
    UserCredentialsPending,
    UserCredentialsSuccess
} from "../../actions/user/credentialAction";
import {UserCredentials} from "../../state/models/login";

export const setUserCredentials = (
    userCredentials: UserCredentials,
    action: UserCredentialsPending | UserCredentialsSuccess | UserCredentialsError | UserCredentialsLogout
): UserCredentials => {
    switch (action.type) {
        case CredentialActionEnums.User_Credentials_Pending:
            return {...action.payload, loading: true, error: null}
        case CredentialActionEnums.User_Credentials_Success:
            return {...action.payload, loading: false, email: action.payload.email, phoneNumber: action.payload.phoneNumber, error: null}
        case CredentialActionEnums.User_Credentials_Error:
            return {...action.payload, loading: false, error: action.payload.error}
        case CredentialActionEnums.User_Credentials_Logout:
            return {...action.payload, loading: true, error: null}
        default:
            return action
    }
}