export interface SellerProductList {
    sellerProducts : Array<SellerProduct>
    loading: boolean
    error: string
}

export interface SellerProduct {
    productId: string
    productQuantity: number
    productDescription: string
    productSubCategory: string
    productCategory: string
    username: string
    productWeightPerUnitInGrams: number
    productPrice: number
    productName: string
}

export const initialSellerProductsList : SellerProductList = {
    sellerProducts : [],
    loading: false,
    error: null
}