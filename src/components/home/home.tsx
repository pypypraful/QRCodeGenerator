import React, {useEffect} from "react";
import Header from "@awsui/components-react/header";
import Cards from "@awsui/components-react/cards";
import Box from "@awsui/components-react/box";
import Grid from "@awsui/components-react/grid";
import Icon from "@awsui/components-react/icon";
import Pagination from "@awsui/components-react/pagination";
import TextFilter from "@awsui/components-react/text-filter";
import Button from "@awsui/components-react/button";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../store/selectors/user/userProfileSelectors";
import {getUserCredentials} from "../../store/selectors/user/credentialSelectors";
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";

export default () => {

    const dispatch = useDispatch()
    const userCredentials = useSelector(getUserCredentials)
    const shopProfiles = useSelector(getUserProfile)

    useEffect(() => {
        dispatch({
            type: UserProfileActionEnum.Seller_Profile_Pending,
            payload: { profileType: "SELLER", pincode: userCredentials.pincode}
        })
    }, [userCredentials.pincode])

    const shopCardDefinition = {
        header: shop => <code>{shop.name}</code>,
        sections: [
            {
                id: "description",
                header: <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}>
                    <div>Address</div><div>Product Types</div><div><Button><Header variant="h2"><code>Go To Shop</code> <Icon name="angle-right-double" size="medium" variant="normal"/></Header></Button></div>
                </Grid>,
                content: shop => <Grid gridDefinition={[{ colspan: 4 }, { colspan: 8 }]}>
                    <code>{shop.description}</code><code>{shop.productTypes}</code>
                </Grid>
            },
            {
                id: "gstin",
                header: <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}>
                    <div>GSTIN</div><div>PAN Number</div><div>Phone Number</div>
                </Grid>,
                content: shop => <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}>
                    <code>{shop.clientAdditionalDetail.gstIN}</code><code>{shop.clientAdditionalDetail.panNumber}</code><code>{shop.phoneNumber}</code>
                </Grid>,
            },
            {
                id: "address",
                header: <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}><div>Address</div><div>City</div><div>State</div></Grid>,
                content: shop => <Grid gridDefinition={[{ colspan: 4 }, { colspan: 4 }, { colspan: 4 }]}><code>{shop.addressLine}</code><code>{shop.city}</code><code>{shop.state}</code></Grid>
            }
        ]
    }

    return(
        <Cards
            trackBy="name"
            variant={"container"}
            cardDefinition={shopCardDefinition}
            cardsPerRow={[{ cards: 1 }]}
            items={shopProfiles.userProfiles}
            loadingText="Loading resources"
            loading={shopProfiles.loading}
            visibleSections={["description", "gstin", "address"]}
            stickyHeader={true}
            empty={
                <Box textAlign="center" color="inherit">
                    <b>No Shops found</b>
                    <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                        No Shops to display.
                    </Box>
                    <Button>Create your own shop</Button>
                </Box>
            }
            filter={
                <TextFilter filteringPlaceholder="Find resources"  filteringText={""}/>
            }
            header={
                <Header
                    counter={`(${shopProfiles.userProfiles?.length || 0})`}
                >
                    Shops Nearby
                </Header>
            }
            pagination={<Pagination currentPageIndex={1} pagesCount={shopProfiles.userProfiles?.length/5} />}
        />
    )
}