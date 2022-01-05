import { takeLatest, put } from "redux-saga/effects";
import {CredentialActionEnums} from "../../store/actions/user/credentialAction"
import {Auth} from "aws-amplify";

export function* UserLoginSaga() {
    yield takeLatest([CredentialActionEnums.User_Credentials_Pending], userLogin)
    yield takeLatest([CredentialActionEnums.User_Credentials_Logout], userLogout)
}

export function* userLogin(action) {
    try{
        const user = yield Auth.signIn(action.payload.username, action.payload.password)
        yield put({
            type: CredentialActionEnums.User_Credentials_Success,
            payload: {email: user.attributes.email, phoneNumber: user.attributes.phone_number}
        })
    } catch (error) {
        yield put({
            type: CredentialActionEnums.User_Credentials_Error,
            payload: {error: `Login failed. ${error.message} Please try again!!`}
        })
    }
}

export function* userLogout(action) {
    try{
        yield Auth.signOut(action.payload.username)
        yield put({
            type: CredentialActionEnums.User_Credentials_Success,
            payload: {email: null, phoneNumber: null}
        })
    } catch (error) {
        yield put({
            type: CredentialActionEnums.User_Credentials_Error,
            payload: {error: `Logout failed. ${error.message} Please try again!!`}
        })
    }
}