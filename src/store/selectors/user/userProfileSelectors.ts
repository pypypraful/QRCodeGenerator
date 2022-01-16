import {State} from "../../state/state";
import {UserProfileList} from "../../state/models/userProfile";

export const getUserProfile = ( state: State): UserProfileList => state.userProfiles