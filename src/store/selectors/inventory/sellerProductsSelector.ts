import {State} from "../../state/state";
import {SellerProductList} from "../../state/models/sellerProduct";

export const getSellerProducts = (state: State) : SellerProductList => state.sellerProducts