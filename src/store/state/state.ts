import {UserCredentials} from "./models/login";
import {UserInventory} from "./models/inventory";
import {UserProfileList} from "./models/userProfile";
import {SellerProductList} from "./models/sellerProduct";

export interface State {
    userCredentials: UserCredentials,
    userInventory: UserInventory,
    userProfiles: UserProfileList,
    sellerProducts: SellerProductList
}