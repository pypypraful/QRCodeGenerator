import { all, call, fork } from 'redux-saga/effects';
import {UserLoginSaga} from "./user/credentials";
import {UserInventorySaga} from "./inventory/userInventorySaga";
import {UserProfileSaga} from "./user/userProfile";
import {sellerProductsSaga} from "./inventory/sellerProductsSaga";


export function* rootSaga() {
    yield fork(setListeners);
}
function* setListeners() {
    const sagas = [
        call(UserLoginSaga),
        call(UserInventorySaga),
        call(UserProfileSaga),
        call(sellerProductsSaga)
    ]

    yield all(sagas)
}