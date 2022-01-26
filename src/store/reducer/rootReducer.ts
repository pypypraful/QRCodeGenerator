import {combineReducers} from "redux";
import { History } from 'history';
import {State} from '../state/state'
import {setUserCredentials} from "./user/credentials";
import {userInventoryReducer} from "./inventory/userInventory";
import {userProfileReducer} from "./user/userProfile";
import {SellerProductsReducer} from "./sellerProduct/SellerProducts";
import {UpdateCustomerCartReducer} from "./inventory/customerCart";

export const createRootReducer = (history: History<Record<string, unknown>>) => {
    return combineReducers<State>({
        userCredentials: setUserCredentials,
        userInventory: userInventoryReducer,
        userProfiles: userProfileReducer,
        sellerProducts: SellerProductsReducer,
        customerCart: UpdateCustomerCartReducer
    });
};