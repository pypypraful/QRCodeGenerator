export interface SellerProfileList {
    sellerProfiles : Array<UserProfile>
    loading: boolean
    error: string
}
export interface UserProfile {
    username: string
    profileType: string
    pincode: number
    clientAdditionalDetail: ClientAdditionalDetail
    name: string
    phoneNumber: string
    addressLine: string
    city: string
    state: string
    loading: boolean
    error: string
}

export interface ClientAdditionalDetail {
    gstIN: string
    panNumber: string
}

export const initialClientAdditionalDetail : ClientAdditionalDetail = {
    gstIN: "", panNumber: ""
}

export const initialUserProfile : UserProfile = {
    addressLine: "",
    city: "",
    clientAdditionalDetail: initialClientAdditionalDetail,
    name: "",
    phoneNumber: "",
    pincode: 0,
    profileType: "",
    state: "",
    username: "",
    loading: true,
    error: null

}

export const initialSellerProfileList : SellerProfileList = {
    sellerProfiles : [initialUserProfile],
    loading: true,
    error: null
}
