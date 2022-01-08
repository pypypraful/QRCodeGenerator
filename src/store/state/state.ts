import {UserCredentials} from "./models/login";
import {UserInventory} from "./models/inventory";

export interface State {
    userCredentials: UserCredentials,
    userInventory: UserInventory
}