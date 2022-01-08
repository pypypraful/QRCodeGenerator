export interface UserInventoryPending {
    type: InventoryActionEnum.User_Inventory_Pending,
    payload: any
}

export interface UserInventorySuccess {
    type: InventoryActionEnum.User_Inventory_Success,
    payload: any
}

export interface UserInventoryError {
    type: InventoryActionEnum.User_Inventory_Error,
    payload: any
}

export interface UpdateUserInventory {
    type: InventoryActionEnum.Update_User_Inventory,
    payload: any
}

export enum InventoryActionEnum {
    User_Inventory_Pending = 'User_Inventory_Pending',
    User_Inventory_Success = 'User_Inventory_Success',
    User_Inventory_Error = 'User_Inventory_Error',
    Update_User_Inventory = 'Update_User_Inventory'
}