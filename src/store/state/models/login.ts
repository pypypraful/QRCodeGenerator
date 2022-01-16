export interface UserCredentials {
    email: string,
    phoneNumber: string,
    pincode: number,
    loading: boolean,
    error: string
}

export const initialUserCredentials : UserCredentials = {
    email: "",
    phoneNumber: "",
    pincode: 282007,
    loading: true,
    error: null
}