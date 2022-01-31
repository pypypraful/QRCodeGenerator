import {put, takeLatest} from "redux-saga/effects";
import {SellerProductsEnum} from "../../store/actions/inventory/sellerProducts";
import axios from "axios";

export function* sellerProductsSaga() {
    yield takeLatest([SellerProductsEnum.Seller_Products_Pending], getSellerProducts)
}

function* getSellerProducts(action) {
    const options = {
        url: "/seller-inventory",
        method: "GET",
        params: {...action.payload},
        timeout: 150000,
        baseURL: 'https://{}.execute-api.ap-south-1.amazonaws.com/Prod',
    }
    axios.defaults.headers.common = {
        "X-API-Key": "",
    };
    try{
        // @ts-ignore
        const sellerProductsResponse = yield axios(options)
        yield put({
            type: SellerProductsEnum.Seller_Products_Success,
            payload: sellerProductsResponse.data
        })
    } catch (error) {
        yield put({
            type: SellerProductsEnum.Seller_Products_Error,
            payload: `Cannot fetch Products due to ${error.message}. Please try again later.`
        })
    }
}