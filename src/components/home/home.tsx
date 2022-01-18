import React, {useEffect} from "react";
import { useHistory} from "react-router-dom";
import Header from "@awsui/components-react/header";
import Cards from "@awsui/components-react/cards";
import Box from "@awsui/components-react/box";
import Grid from "@awsui/components-react/grid";
import Pagination from "@awsui/components-react/pagination";
import TextFilter from "@awsui/components-react/text-filter";
import Button from "@awsui/components-react/button";
import TextContent from "@awsui/components-react/text-content";
import Link from "@awsui/components-react/link";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../store/selectors/user/userProfileSelectors";
import {getUserCredentials} from "../../store/selectors/user/credentialSelectors";
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";

export default () => {

    const dispatch = useDispatch()
    const history = useHistory();
    const userCredentials = useSelector(getUserCredentials)
    const shopProfiles = useSelector(getUserProfile)

    useEffect(() => {
        dispatch({
            type: UserProfileActionEnum.Seller_Profile_Pending,
            payload: { profileType: "SELLER", pincode: userCredentials.pincode}
        })
    }, [userCredentials.pincode])

    const shopCardDefinition = {
        header: shop =>
            <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}><TextContent>
                <Link fontSize="heading-xl" variant="primary" onFollow={() => history.push({ pathname: "/products", state: {username: shop.username, shopName: shop.name}})}>{shop.name}</Link>
            </TextContent></Grid>,
        sections: [
            {
                id: "seller",
                content: seller =>
                    <Grid gridDefinition={[{ colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }, { colspan: { default: 12, m: 3 } }]}>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Description</div><div><code>{seller.description || "N/A"}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Product Types</div><div><code>{seller?.productCategories || "N/A"}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>GSTIN</div><div><code>{seller.clientAdditionalDetail.gstIN}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>PAN Number</div><div><code>{seller.clientAdditionalDetail.panNumber}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Phone Number</div><div><code>{seller.phoneNumber}</code></div>
                        </Grid>
                        <Grid disableGutters={true} gridDefinition={[{ colspan: 12 }]}>
                            <div>Address</div><div><code>{seller.addressLine}, {seller.city}, {seller.state}</code></div>
                        </Grid>
                    </Grid>
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
            visibleSections={["seller"]}
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