import {UserCredentials} from "./models/login";
import {UserInventory} from "./models/inventory";
import {SellerProfileList, UserProfile} from "./models/userProfile";
import {SellerProductList} from "./models/sellerProduct";
import {CustomerCart} from "./models/customerCart";

export interface State {
    userCredentials: UserCredentials,
    userInventory: UserInventory,
    userProfile: UserProfile,
    sellerProfiles: SellerProfileList,
    sellerProducts: SellerProductList,
    customerCart: CustomerCart
}