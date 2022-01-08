import {UserCredentials} from "./models/login";
import {UserInventory} from "./models/inventory";
import {UserProfile} from "./models/userProfile";

export interface State {
    userCredentials: UserCredentials,
    userInventory: UserInventory,
    userProfile: UserProfile
}