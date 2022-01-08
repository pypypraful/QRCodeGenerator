import {State} from "../../state/state";
import {UserInventory} from "../../state/models/inventory";

export const getUserInventory = (state: State): UserInventory => state.userInventory