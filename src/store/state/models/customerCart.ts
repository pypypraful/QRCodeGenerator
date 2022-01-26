export interface CustomerCart {
    customerId: string
    products: Array<Product>
    productMap: Map<string, Product>
    loading: boolean
    error: any

}

export interface Product {
    productName: string
    price: number
    quantity: number
    productId: string
}

export const initialCustomerCart: CustomerCart = {
    error: null,
    loading: false,
    customerId: "",
    products: [],
    productMap: new Map<string, Product>()
}