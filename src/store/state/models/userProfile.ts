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
