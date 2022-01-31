import {State} from "../../state/state";
import {SellerProfileList, UserProfile} from "../../state/models/userProfile";

export const getUserProfile = ( state: State): UserProfile => state.userProfile

export const getSellerProfiles = (state: State) : SellerProfileList => state.sellerProfiles