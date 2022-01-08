import {UserInventory} from "../../state/models/inventory";
import {
    InventoryActionEnum, UpdateUserInventory,
    UserInventoryError,
    UserInventoryPending,
    UserInventorySuccess
} from "../../actions/inventory/userInventory";

export const userInventoryReducer = (
    userInventory: UserInventory,
    action: UserInventoryPending | UserInventorySuccess | UserInventoryError | UpdateUserInventory
): UserInventory => {
    switch (action.type) {
        case InventoryActionEnum.User_Inventory_Pending:
            return {...userInventory, loading: true, error: null}
        case InventoryActionEnum.User_Inventory_Success:
            return {...action.payload, loading: false, error: null}
        case InventoryActionEnum.User_Inventory_Error:
            return {...userInventory, loading: false, error: action.payload}
        case InventoryActionEnum.Update_User_Inventory:
            return {...userInventory, loading: true, error: null}
        default:
            return action
    }
}
