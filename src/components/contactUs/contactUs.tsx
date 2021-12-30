import React from "react"
import Container from "@awsui/components-react/container"
import Header from "@awsui/components-react/header"
import TextContent from "@awsui/components-react/text-content";

export default () => {
    return(
        <Container
            header={<Header variant={"h2"} description={"You can contact me through below means of communication"}>Contact Us</Header>}
        >
            <TextContent>
                <p>
                    <strong>Email: </strong>
                    <small>
                        <a href="mailto:prafulgoyal999@gmail.com?subject=QR Code Generator Query">prafulgoyal999@gmail.com</a>
                    </small>
                </p>
            </TextContent>
        </Container>
    )
}