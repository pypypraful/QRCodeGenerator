import {CustomerCart, initialCustomerCart, Product} from "../../state/models/customerCart";
import {
    CustomerCartEnum,
    GetCustomerCartPending,
    UpdateCustomerCartError,
    UpdateCustomerCartPending,
    UpdateCustomerCartSuccess
} from "../../actions/inventory/customerCart";
import {clone} from "lodash/fp"

export const UpdateCustomerCartReducer = (
    customerCart: CustomerCart = initialCustomerCart,
    action: UpdateCustomerCartPending | UpdateCustomerCartSuccess | UpdateCustomerCartError | GetCustomerCartPending
): CustomerCart => {
    switch (action.type) {
        case CustomerCartEnum.Customer_Cart_Success:
            return { ...customerCart, loading: false, error: null,
                products: removeProductFromCustomerCart(action.payload.products),
                productMap: getProductMapFromCustomerCart(action.payload.products),
                customerId: action.payload.customerId }
        case CustomerCartEnum.Customer_Cart_Error:
            return { ...customerCart, loading: false, error: action.payload }
        case CustomerCartEnum.Update_Customer_Cart_Pending:
            return { ...customerCart, loading: true, error: null }
        case CustomerCartEnum.Get_Customer_Cart_Pending:
            return { ...customerCart, loading: true, error: null }
        default:
            return customerCart
    }
}

const removeProductFromCustomerCart = (productList) => {
    let updatedProductList = clone(productList)
    return updatedProductList.filter(product => product.quantity != 0)
}

const getProductMapFromCustomerCart = (customerCartProducts : Array<Product>) => {
    const productMap = new Map<string, Product>()
    customerCartProducts.forEach(product => {
        if (product.quantity != 0)
            productMap[product.productId] = clone(product)
    })
    return productMap
}