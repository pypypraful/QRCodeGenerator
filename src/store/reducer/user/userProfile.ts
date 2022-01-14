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
            return {...action.payload, loading: false, error: null}
        case UserProfileActionEnum.User_Profile_Pending:
            return {...userProfile, loading: true, error: null}
        case UserProfileActionEnum.User_Profile_Error:
            return {
                addressLine: "",
                city: "",
                clientAdditionalDetail: undefined,
                name: "",
                phoneNumber: "",
                pincode: 0,
                profileType: "",
                state: "",
                username: "",
                loading: false, error: action.payload}
        case UserProfileActionEnum.User_Profile_Update:
            return {...userProfile, loading: true, error: null}
        default:
            return {...userProfile}
    }
}