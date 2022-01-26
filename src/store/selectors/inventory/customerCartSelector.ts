import {State} from "../../state/state";
import {CustomerCart} from "../../state/models/customerCart";

export const getCustomerCart = (state: State) : CustomerCart => state.customerCart