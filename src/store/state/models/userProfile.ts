export interface UserProfile {
    username: string
    customerProfile: CustomerProfile
    businessProfile: BusinessProfile
    loading: boolean
    error: string
}

export interface CustomerProfile {
    customerName: string
    customerPhoneNumber: string
    homeAddress: Address
}

export interface BusinessProfile {
    businessName: string
    businessPhoneNumber: string
    businessAddress: Address
    gstIN: string
    panNumber: string
}

export interface Address {
    addressLine: string
    city: string
    state: string
    pincode: number
}