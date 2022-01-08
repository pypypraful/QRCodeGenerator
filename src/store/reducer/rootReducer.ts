import {combineReducers} from "redux";
import { History } from 'history';
import {State} from '../state/state'
import {setUserCredentials} from "./user/credentials";
import {userInventoryReducer} from "./inventory/userInventory";

export const createRootReducer = (history: History<Record<string, unknown>>) => {
    return combineReducers<State>({
        userCredentials: setUserCredentials,
        userInventory: userInventoryReducer
    });
};