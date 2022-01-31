import {
    initialSellerProfileList,
    initialUserProfile,
    SellerProfileList,
    UserProfile
} from "../../state/models/userProfile";
import {
    SellerProfileError,
    SellerProfilePending, SellerProfileSuccess,
    UserProfileActionEnum,
    UserProfileError,
    UserProfilePending,
    UserProfileSuccess,
    UserProfileUpdate
} from "../../actions/user/userProfileAction";

export const userProfileReducer = (
    userProfile: UserProfile = initialUserProfile,
    action: UserProfileSuccess | UserProfilePending | UserProfileError | UserProfileUpdate | SellerProfilePending
): UserProfile => {
    switch (action.type) {
        case UserProfileActionEnum.User_Profile_Success:
            return { ...action.payload.userProfile , loading: false, error: null}
        case UserProfileActionEnum.User_Profile_Pending:
            return {...userProfile, loading: true, error: null}
        case UserProfileActionEnum.Seller_Profile_Pending:
            return {...userProfile, loading: true, error: null}
        case UserProfileActionEnum.User_Profile_Error:
            return {...initialUserProfile, loading: false, error: action.payload}
        case UserProfileActionEnum.User_Profile_Update:
            return {...userProfile, loading: true, error: null}
        default:
            return {...userProfile}
    }
}

export const sellerProfileReducer = (
    sellerProfiles: SellerProfileList = initialSellerProfileList,
    action: SellerProfilePending | SellerProfileSuccess | SellerProfileError
): SellerProfileList => {
    switch (action.type) {
        case UserProfileActionEnum.Seller_Profile_Success:
            return { ...action.payload.sellerProfiles , loading: false, error: null}
        case UserProfileActionEnum.Seller_Profile_Error:
            return {...sellerProfiles, loading: true, error: null}
        case UserProfileActionEnum.Seller_Profile_Pending:
            return {...sellerProfiles, loading: true, error: null}
        default:
            return {...sellerProfiles}
    }
}