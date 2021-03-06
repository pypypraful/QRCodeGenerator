import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";
import Box from "@awsui/components-react/box";
import Button from "@awsui/components-react/button";
import TextFilter from "@awsui/components-react/text-filter";
import Spinner from "@awsui/components-react/spinner";
import Header from "@awsui/components-react/header";
import Pagination from "@awsui/components-react/pagination";
import Cards from "@awsui/components-react/cards";
import Grid from "@awsui/components-react/grid";
import TextContent from "@awsui/components-react/text-content";
import {getSellerProducts} from "../../store/selectors/inventory/sellerProductsSelector";
import {SellerProductsEnum} from "../../store/actions/inventory/sellerProducts";
import {getCustomerCart} from "../../store/selectors/inventory/customerCartSelector";
import {CustomerCartEnum} from "../../store/actions/inventory/customerCart";

export default (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const sellerProductList = useSelector(getSellerProducts)
    const customerCart = useSelector(getCustomerCart)
    const [refresh, setRefresh] = useState(false)
    const {username, shopName} = props.history.location.state

    useEffect(() => {
        dispatch({
            type: SellerProductsEnum.Seller_Products_Pending,
            payload: { username: username}
        })
    }, [props.history.location.state.username, refresh])

    useEffect(() => {
        dispatch({
            type: CustomerCartEnum.Get_Customer_Cart_Pending
        })
    }, [])

    const handleRemoveProductHandler = (product) => {
        if (!customerCart.productMap[product.productId]?.quantity) return
        dispatch({
            type: CustomerCartEnum.Update_Customer_Cart_Pending,
            payload: {productId: product.productId, quantity: (customerCart.productMap[product.productId]?.quantity || 0) - 1}
        })
    }

    const handleAddProductHandler = (product) => {
        dispatch({
            type: CustomerCartEnum.Update_Customer_Cart_Pending,
            payload: {productId: product.productId, quantity: (customerCart.productMap[product.productId]?.quantity || 0) + 1}
        })
    }

    const productCardDefinition = {
        header: product =>
            <Grid disableGutters={true} gridDefinition={[{ colspan: 9 }, { colspan: 3 }]}>
                <TextContent><pre>{product.productName}</pre></TextContent>
                <div>
                    <Button iconName={'treeview-collapse'} variant={'icon'} onClick={() => handleRemoveProductHandler(product)} disabled={(customerCart.productMap[product.productId]?.quantity || 0) == 0 || customerCart.loading}/>
                        <code> {customerCart.loading ? <Spinner key={0} size={"normal"}/> : customerCart.productMap[product.productId]?.quantity || 0 } </code>
                    <Button iconName={'treeview-expand'} variant={'icon'} onClick={() => handleAddProductHandler(product)} disabled={(customerCart.productMap[product.productId]?.quantity || 0) == 5 || customerCart.loading}/></div>
            </Grid>,
        sections: [
            {
                id: "product",
                content: product =>
                    <Grid gridDefinition={[{ colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }]}>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Description</div><div><code>{product.productDescription}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Product Type</div><div><code>{product.productSubCategory}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Price</div><div><code>Rs.{product.productPrice}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Weight</div><div><code>{product.productWeightPerUnitInGrams} gms</code></div>
                        </Grid>
                    </Grid>
            }
        ]
    }

    return(
        <>
            <Cards
                trackBy="name"
                variant={"container"}
                cardDefinition={productCardDefinition}
                cardsPerRow={[{ cards: 1 }]}
                items={sellerProductList.sellerProducts}
                loadingText="Loading resources"
                loading={sellerProductList.loading}
                visibleSections={["product"]}
                stickyHeader={true}
                empty={
                    <Box textAlign="center" color="inherit">
                        <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                            {sellerProductList?.error ? sellerProductList.error : "No Product available for this shop."}
                        </Box>
                        <Button onClick={() => history.push({ pathname: "/"})}>See another shop</Button>
                    </Box>
                }
                filter={
                    <TextFilter filteringPlaceholder="Find resources"  filteringText={""}/>
                }
                header={
                    <Header
                        counter={`(${sellerProductList.sellerProducts?.length || 0})`}
                        actions={<Button iconName="refresh" variant="icon" loading={sellerProductList.loading} onClick={() => setRefresh(!refresh)} />}
                    >
                        {shopName}
                    </Header>
                }
                pagination={<Pagination currentPageIndex={1} pagesCount={sellerProductList.sellerProducts?.length/5} />}
            />
        </>
    )
}