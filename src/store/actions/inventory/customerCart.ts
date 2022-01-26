export interface UpdateCustomerCartPending {
    type: CustomerCartEnum.Update_Customer_Cart_Pending,
    payload: any
}

export interface GetCustomerCartPending {
    type: CustomerCartEnum.Get_Customer_Cart_Pending,
    payload: any
}

export interface UpdateCustomerCartSuccess {
    type: CustomerCartEnum.Customer_Cart_Success,
    payload: any
}

export interface UpdateCustomerCartError {
    type: CustomerCartEnum.Customer_Cart_Error,
    payload: any
}

export enum CustomerCartEnum {
    Update_Customer_Cart_Pending = 'Update_Customer_Cart_Pending',
    Get_Customer_Cart_Pending = 'Get_Customer_Cart_Pending',
    Customer_Cart_Success = 'Customer_Cart_Success',
    Customer_Cart_Error = 'Customer_Cart_Error',
}
