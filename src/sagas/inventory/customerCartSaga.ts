import {put, takeLatest} from "redux-saga/effects";
import {CustomerCartEnum} from "../../store/actions/inventory/customerCart";
import {Auth} from "aws-amplify";
import API from "@aws-amplify/api";

export function* customerCartSaga() {
    yield takeLatest([CustomerCartEnum.Update_Customer_Cart_Pending], updateCustomerCart)
    yield takeLatest([CustomerCartEnum.Get_Customer_Cart_Pending], getCustomerCart)
}

function* updateCustomerCart(action) {
    try{
        const userInfo = yield Auth.currentAuthenticatedUser()
        const requestBody = {
            customerId: userInfo.username,
            ...action.payload
        }
        const customerCart = yield API.put("Inventory", "/customer-cart",
            {
                header: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                body: requestBody
            })
        yield put({
            type: CustomerCartEnum.Customer_Cart_Success,
            payload: customerCart
        })
    } catch (error) {
        console.log(error)
        yield put({
            type: CustomerCartEnum.Customer_Cart_Error,
            payload: `Failed to Update the Cart!!`
        })
    }
}

function* getCustomerCart(action) {
    try{
        const userInfo = yield Auth.currentAuthenticatedUser()
        const customerCart = yield API.get("Inventory", "/customer-cart",
            {
                header: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                queryStringParameters: { customerId: userInfo.username }
            })
        yield put({
            type: CustomerCartEnum.Customer_Cart_Success,
            payload: customerCart
        })
    } catch (error) {
        yield put({
            type: CustomerCartEnum.Customer_Cart_Error,
            payload: `Failed to Update the Cart!!`
        })
    }
}