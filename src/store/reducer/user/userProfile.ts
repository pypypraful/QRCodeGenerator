import {UserProfileList} from "../../state/models/userProfile";
import {
    SellerProfilePending,
    UserProfileActionEnum,
    UserProfileError,
    UserProfilePending,
    UserProfileSuccess,
    UserProfileUpdate
} from "../../actions/user/userProfileAction";

export const userProfileReducer = (
    userProfiles: UserProfileList,
    action: UserProfileSuccess | UserProfilePending | UserProfileError | UserProfileUpdate | SellerProfilePending
): UserProfileList => {
    switch (action.type) {
        case UserProfileActionEnum.User_Profile_Success:
            return {userProfiles: action.payload.userProfiles, loading: false, error: null}
        case UserProfileActionEnum.User_Profile_Pending:
            return {...userProfiles, loading: true, error: null}
        case UserProfileActionEnum.Seller_Profile_Pending:
            return {...userProfiles, loading: true, error: null}
        case UserProfileActionEnum.User_Profile_Error:
            return {userProfiles: undefined, loading: false, error: action.payload}
        case UserProfileActionEnum.User_Profile_Update:
            return {...userProfiles, loading: true, error: null}
        default:
            return {...userProfiles}
    }
}