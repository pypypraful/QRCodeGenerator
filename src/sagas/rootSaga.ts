import { all, call, fork } from 'redux-saga/effects';
import {UserLoginSaga} from "./user/credentials";
import {UserInventorySaga} from "./inventory/userInventorySaga";


export function* rootSaga() {
    yield fork(setListeners);
}
function* setListeners() {
    const sagas = [
        call(UserLoginSaga),
        call(UserInventorySaga)
    ]

    yield all(sagas)
}