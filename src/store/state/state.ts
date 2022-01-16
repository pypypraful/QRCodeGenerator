import {UserCredentials} from "./models/login";
import {UserInventory} from "./models/inventory";
import {UserProfileList} from "./models/userProfile";

export interface State {
    userCredentials: UserCredentials,
    userInventory: UserInventory,
    userProfiles: UserProfileList
}