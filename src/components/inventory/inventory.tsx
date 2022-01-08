import React, {useState, useEffect} from "react"
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import AttributeEditor from "@awsui/components-react/attribute-editor";
import Input from "@awsui/components-react/input";
import {useDispatch, useSelector} from "react-redux";
import {getUserInventory} from "../../store/selectors/inventory/userInventorySelector";
import {InventoryActionEnum} from "../../store/actions/inventory/userInventory";
import {FormField, Spinner} from "@awsui/components-react";
import Button from "@awsui/components-react/button";

export default () => {

    const userInventory = useSelector(getUserInventory)
    const dispatch = useDispatch()
    const [validationError, setValidationError] = useState([])

    useEffect(() => {
        dispatch({
            type: InventoryActionEnum.User_Inventory_Pending
        })
    }, [])

    const onChangeHandler = ( itemIndex, attributeName, value) => {
        let payload = userInventory
        switch (attributeName) {
            case 'productName':
                payload.inventory[itemIndex].productName = value
                break
            case 'price':
                payload.inventory[itemIndex].price = value
                break
            case 'quantity':
                payload.inventory[itemIndex].quantity = value
                break
            default:
                break
        }
        dispatch({
            type: InventoryActionEnum.User_Inventory_Success,
            payload: payload
        })
    }

    const submitHandler = () => {
        let error = []
        let isError = false
        userInventory.inventory.forEach((inventory, index) => {
            error.push({})
            inventory.productName ? error[index].productName = null : (error[index].productName = "Product Name cannot be empty.", isError = true)
            inventory.price ? error[index].price = null : (error[index].price = "Price cannot be empty.", isError = true)
            inventory.quantity ? error[index].quantity = null : (error[index].quantity = "Quantity cannot be empty.", isError = true)
        })
        setValidationError(error)
        if (!isError) {
            dispatch({
                type: InventoryActionEnum.Update_User_Inventory,
                payload: userInventory
            })
        }
    }

    return(
        <Container
            header={
                <Header
                    variant="h2"
                    description="Your items in inventory"
                >
                    Inventory
                </Header>
            }
            footer={
                <Button variant="primary" onClick={() => (submitHandler())} disabled={userInventory.loading}>Update Inventory</Button>
            }
        >
            { userInventory.loading ? <Spinner size={'large'}/> : ""}
            { userInventory.error ? "Something Bad Happened. Reload it." : "" }
            { userInventory.inventory ?
            <AttributeEditor
                onAddButtonClick={() => dispatch({
                    type: InventoryActionEnum.User_Inventory_Success,
                    payload: { ...userInventory, inventory: [...userInventory.inventory, {}]}
                })}
                onRemoveButtonClick={({detail: { itemIndex }}) => {
                    const tmpItems = [...userInventory.inventory];
                    tmpItems.splice(itemIndex, 1);
                    dispatch({
                        type: InventoryActionEnum.User_Inventory_Success,
                        payload: { ...userInventory, inventory: [...tmpItems]}
                    })
                }}
                items={userInventory.inventory}
                definition={[
                    {
                        label: "Product Name",
                        control: (item, itemIndex) =>
                            <FormField errorText={validationError[itemIndex]?.productName}>
                                <Input
                                    value={item.productName}
                                    onChange={({detail}) => onChangeHandler(itemIndex, 'productName', detail.value)}
                                    placeholder="Enter New Product Name"
                                />
                            </FormField>
                    },
                    {
                        label: "Price",
                        control: (item, itemIndex) =>
                            <FormField errorText={validationError[itemIndex]?.price}>
                                <Input
                                    type={'number'}
                                    // @ts-ignore
                                    value={item.price}
                                    onChange={({detail}) => onChangeHandler(itemIndex, 'price', detail.value)}
                                    placeholder="Enter Price per product"
                                />
                            </FormField>
                    },
                    {
                        label: "Quantity",
                        control: (item, itemIndex) =>
                            <FormField errorText={validationError[itemIndex]?.quantity}>
                                <Input
                                    type={"number"}
                                    // @ts-ignore
                                    value={item.quantity}
                                    onChange={({detail}) => onChangeHandler(itemIndex, 'quantity', detail.value)}
                                    placeholder="Enter quantity you have for that product"
                                />
                            </FormField>
                    }
                ]}
                addButtonText="Add new item"
                removeButtonText="Remove"
                empty="No items in your inventory."
            /> : ""}
        </Container>
    )
}