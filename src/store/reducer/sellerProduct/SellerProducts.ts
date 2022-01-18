import {
    SellerProductsEnum,
    SellerProductsError,
    SellerProductsPending,
    SellerProductsSuccess
} from "../../actions/inventory/sellerProducts";
import {initialSellerProductsList, SellerProductList} from "../../state/models/sellerProduct";

export const SellerProductsReducer = (
    sellerProducts: SellerProductList = initialSellerProductsList,
    action: SellerProductsPending | SellerProductsSuccess | SellerProductsError
): SellerProductList => {
    switch (action.type) {
        case SellerProductsEnum.Seller_Products_Pending:
            return {...sellerProducts, loading: true, error: null}
        case SellerProductsEnum.Seller_Products_Success:
            return {sellerProducts: action.payload.productList, loading: false, error: null}
        case SellerProductsEnum.Seller_Products_Error:
            return {sellerProducts: [], loading: false, error: action.payload}
        default:
            return sellerProducts
    }
}