export interface SellerProductsPending {
    type: SellerProductsEnum.Seller_Products_Pending,
    payload: any
}

export interface SellerProductsSuccess {
    type: SellerProductsEnum.Seller_Products_Success,
    payload: any
}

export interface SellerProductsError {
    type: SellerProductsEnum.Seller_Products_Error,
    payload: any
}

export enum SellerProductsEnum {
    Seller_Products_Pending = 'Seller_Products_Pending',
    Seller_Products_Success = 'Seller_Products_Success',
    Seller_Products_Error = 'Seller_Products_Error',
}