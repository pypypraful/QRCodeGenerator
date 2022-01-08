import {put, takeLatest} from "redux-saga/effects";
import {API, Auth} from "aws-amplify";
import {InventoryActionEnum} from "../../store/actions/inventory/userInventory";

export function* UserInventorySaga() {
    yield takeLatest([InventoryActionEnum.User_Inventory_Pending], getUserInventory)
    yield takeLatest([InventoryActionEnum.Update_User_Inventory], updateUserInventory)
}

export function* getUserInventory(action) {
    const userInfo = yield Auth.currentAuthenticatedUser()
    try{
        const inventory = yield API.get("Inventory", `/inventory`,
            {
                headers: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                queryStringParameters: {username: userInfo.username}
            })
        yield put({
            type: InventoryActionEnum.User_Inventory_Success,
            payload: inventory
        })
    } catch (error) {
        yield put({
            type: InventoryActionEnum.User_Inventory_Error,
            payload: {error: `Login failed. ${error.message} Please try again!!`}
        })
    }
}

export function* updateUserInventory(action) {
    try{
        const inventory = yield API.post("Inventory", `/inventory`,
            {
                headers: {Authorization: `Bearer ${(yield Auth.currentSession()).getIdToken().getJwtToken()}`},
                body: action.payload
            })
        yield put({
            type: InventoryActionEnum.User_Inventory_Success,
            payload: action.payload
        })
    } catch (error) {
        yield put({
            type: InventoryActionEnum.User_Inventory_Error,
            payload: {error: `Login failed. ${error.message} Please try again!!`}
        })
    }
}

