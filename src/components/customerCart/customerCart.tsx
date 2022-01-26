import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Wizard from "@awsui/components-react/wizard";
import Container from "@awsui/components-react/container";
import Button from "@awsui/components-react/button";
import Box from "@awsui/components-react/box";
import Cards from "@awsui/components-react/cards";
import Grid from "@awsui/components-react/grid";
import TextContent from "@awsui/components-react/text-content";
import Spinner from "@awsui/components-react/spinner";
import {CustomerCartEnum} from "../../store/actions/inventory/customerCart";
import {getCustomerCart} from "../../store/selectors/inventory/customerCartSelector";
import Link from "@awsui/components-react/link";

export default () => {

    const [activeStepIndex, setActiveStepIndex] = React.useState(0);

    const dispatch = useDispatch()
    const history = useHistory()
    const customerCart = useSelector(getCustomerCart)

    const label = ["Your Cart", "Review & Checkout", "Add Delivery Details", "Confirm Payment"]

    useEffect(() => {
        dispatch({
            type: CustomerCartEnum.Get_Customer_Cart_Pending
        })
    }, [])

    const handleRemoveProductHandler = (product) => {
        if (customerCart.productMap[product.productId]?.quantity == 0)
            return
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
                <TextContent><pre><Link>{product.productName}</Link></pre></TextContent>
                <div>
                    <Button iconName={'treeview-collapse'} variant={'icon'} onClick={() => handleRemoveProductHandler(product)} disabled={(customerCart.productMap[product.productId]?.quantity || 0) == 0 || customerCart.loading}/>
                    <code> {customerCart.loading ? <Spinner key={0} size={"normal"}/> : customerCart.productMap[product.productId]?.quantity || 0 } </code>
                    <Button iconName={'treeview-expand'} variant={'icon'} onClick={() => handleAddProductHandler(product)} disabled={(customerCart.productMap[product.productId]?.quantity || 0) == 5 || customerCart.loading}/>
                </div>
            </Grid>,
        sections: [
            {
                id: "product",
                content: product =>
                    <Grid gridDefinition={[{ colspan: { default: 9 } }, { colspan: { default: 3 } }]}>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Price</div><div><code>Rs.{product.price}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Sub Total</div><div><code>Rs.{product.price*customerCart.productMap[product.productId]?.quantity}</code></div>
                        </Grid>
                    </Grid>
            }
        ]
    }

    return(
        <Container>
            <Wizard
                i18nStrings={{
                    stepNumberLabel: stepNumber => ``,
                    //@ts-ignore
                    collapsedStepsLabel: (stepNumber, stepsCount) => <div><code>{label[0]}</code> | <code>{label[1]}</code> | <code>{label[2]}</code> | <code>{label[3]}</code></div>,
                    cancelButton: "Cancel",
                    previousButton: "Previous",
                    nextButton: "Next",
                    submitButton: "Launch instance",
                }}
                onNavigate={({ detail }) =>
                    setActiveStepIndex(detail.requestedStepIndex)
                }
                activeStepIndex={activeStepIndex}
                steps={[
                    {
                        title: "Your Cart",
                        description: "Finalize your products here.",
                        content: (
                            <Cards
                                variant={"container"}
                                cardDefinition={productCardDefinition}
                                cardsPerRow={[{ cards: 1 }]}
                                items={customerCart.products}
                                loadingText="Loading resources"
                                visibleSections={["product"]}
                                stickyHeader={true}
                                empty={
                                    <Box textAlign="center" color="inherit">
                                        <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                                            {customerCart?.error ? customerCart.error : "Cart is empty."}
                                        </Box>
                                        <Button onClick={() => history.push({ pathname: "/"})}>Shop Now</Button>
                                    </Box>
                                }
                            />
                        )
                    },
                    {
                        title: "Review & Checkout",
                        content: (
                            <Container>

                            </Container>
                        )
                    },
                    {
                        title: "Add Delivery Details",
                        content: (
                            <Container>

                            </Container>
                        )
                    },
                    {
                        title: "Confirm Payment",
                        content: (
                            <Container>

                            </Container>
                        )
                    }
                ]}
            />
        </Container>
    )
}