import {State} from "../../state/state";
import {UserProfile} from "../../state/models/userProfile";

export const getUserProfile = ( state: State): UserProfile => state.userProfile