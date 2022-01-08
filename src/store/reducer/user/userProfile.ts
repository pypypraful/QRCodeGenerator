import {UserProfile} from "../../state/models/userProfile";
import {
    UserProfileActionEnum,
    UserProfileError,
    UserProfilePending,
    UserProfileSuccess,
    UserProfileUpdate
} from "../../actions/user/userProfileAction";

export const userProfileReducer = (
    userProfile: UserProfile,
    action: UserProfileSuccess | UserProfilePending | UserProfileError | UserProfileUpdate
): UserProfile => {
    switch (action.type) {
        case UserProfileActionEnum.User_Profile_Success:
            return {...userProfile, loading: false, error: null, username: action.payload.username, customerProfile: action.payload.customerProfile, businessProfile: action.payload.businessProfile}
        case UserProfileActionEnum.User_Profile_Pending:
            return {...userProfile, loading: true, error: null}
        case UserProfileActionEnum.User_Profile_Error:
            return {...userProfile, loading: false, error: action.payload}
        case UserProfileActionEnum.User_Profile_Update:
            return {...userProfile, loading: true, error: null}
        default:
            return {...userProfile}
    }
}