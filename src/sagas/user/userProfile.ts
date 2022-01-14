import {takeLatest, put} from "redux-saga/effects";
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";
import {API, Auth} from "aws-amplify";

export function* UserProfileSaga() {
    yield takeLatest([UserProfileActionEnum.User_Profile_Pending], getUserProfile)
    yield takeLatest([UserProfileActionEnum.User_Profile_Update], updateUserProfile)
}

export function* getUserProfile(action) {
    const userInfo = yield Auth.currentAuthenticatedUser()
    try{
        const users = yield  API.get("Inventory", `/users`,
            {
                headers: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                queryStringParameters: {username: userInfo.username, ...action.payload}
            })
        yield put({
            type: UserProfileActionEnum.User_Profile_Success,
            payload: users.userProfiles[0]
        })
    } catch (error) {
        yield put({
            type: UserProfileActionEnum.User_Profile_Error,
            payload: `Cannot fetch User Profile due to ${error.message}. Please try again later.`
        })
    }
}

export function* updateUserProfile(action) {
    try{
        const userProfile = yield  API.post("Inventory", `/users`,
            {
                headers: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                body: {userProfile : action.payload}
            })
        yield put({
            type: UserProfileActionEnum.User_Profile_Success,
            payload: userProfile
        })
    } catch (error) {
        yield put({
            type: UserProfileActionEnum.User_Profile_Error,
            payload: `Cannot Update User Profile due to ${error.message}. Please try again later.`
        })
    }
}