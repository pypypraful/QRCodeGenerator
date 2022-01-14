import React from "react";
import Tabs from "@awsui/components-react/tabs";
import SellerProfile from "./sellerProfile"
import BuyerProfile from "./buyerProfile"

export default () => {

    return(
        <Tabs
            tabs={[
                {
                    label: "Seller Profile",
                    id: "first",
                    content: <SellerProfile />
                },
                {
                    label: "Buyer Profile",
                    id: "second",
                    content: <BuyerProfile />
                }
            ]}
            variant="container"
        />
    )
}