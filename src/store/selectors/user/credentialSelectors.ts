import {State} from "../../state/state";
import {UserCredentials} from "../../state/models/login";

export const getUserCredentials = (state: State): UserCredentials => state.userCredentials