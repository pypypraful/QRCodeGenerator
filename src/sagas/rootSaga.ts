import { all, call, fork } from 'redux-saga/effects';
import {UserLoginSaga} from "./user/credentials";


export function* rootSaga() {
    yield fork(setListeners);
}
function* setListeners() {
    const sagas = [
        call(UserLoginSaga)
    ]

    yield all(sagas)
}