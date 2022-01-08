export interface UserInventory {
    username: string
    inventory: [UserProduct]
    loading: boolean,
    error: any
}

export interface UserProduct {
    productName: string,
    price: number,
    quantity: number
}