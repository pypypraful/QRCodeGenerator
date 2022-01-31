import React, {useEffect, useState} from "react"
import Grid from "@awsui/components-react/grid";
import Container from "@awsui/components-react/container";
import Flashbar from "@awsui/components-react/flashbar";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import ColumnLayout from "@awsui/components-react/column-layout";
import FormField from "@awsui/components-react/form-field";
import Input from "@awsui/components-react/input";
import Checkbox from "@awsui/components-react/checkbox";
import Form from "@awsui/components-react/form";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CredentialActionEnums} from "../../store/actions/user/credentialAction";
import {getUserCredentials} from "../../store/selectors/user/credentialSelectors";

export default () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const userCredentials = useSelector(getUserCredentials)
    const [flashbarItem, setFlashbarItem] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheckBox, setPasswordCheckBox] = useState(false)
    const [passwordTextType, setPasswordTextType] = useState("password")

    useEffect(() => {
        if (userCredentials.loading) {
            setFlashbarItem([{
                type: "info",
                loading: userCredentials.loading,
                content: "Logging in, Please wait...",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
        } else if (userCredentials.error) {
            setFlashbarItem([{
                type: "error",
                content: userCredentials.error,
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
        } else if (userCredentials.email && userCredentials.phoneNumber) {
            setFlashbarItem([{
                type: "success",
                content: "Login successfully. Redirecting to home page in 3 secs",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            localStorage.setItem("user", JSON.stringify(userCredentials))
            history.push({pathname: '/', state: true})
        }

    }, [userCredentials])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({type: CredentialActionEnums.User_Credentials_Pending, payload: {username: email, password: password}})
    }

    return(
        <>
            <Grid gridDefinition={[{ colspan: { default: 12, xs:2,  s: 4 } }, { colspan: { default: 12, xs:8, s:4 } }, { colspan: { default: 12, xs:2, s:4 } }]}>
                <div/>
                <div>
                    <Flashbar items={flashbarItem}/>
                    <Container
                        header={<>
                            <Header
                                variant="h2"
                                description="Please fill each information carefully"
                            >
                                    Login
                            </Header></>
                        }
                    >
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="primary" onClick={(e) => handleSubmit(e)}
                                            disabled={userCredentials.loading || !(email && password)}>
                                        Login
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                            <ColumnLayout columns={1}>
                                <FormField label="Email*">
                                    <Input
                                        value={email}
                                        inputMode="email"
                                        onChange={event =>
                                            setEmail(event.detail.value)
                                        }
                                    />
                                </FormField>
                                <FormField label="Password*">
                                    <Input
                                        value={password}
                                        // @ts-ignore
                                        type={passwordTextType}
                                        onChange={event =>
                                            setPassword(event.detail.value)
                                        }
                                    />
                                    <Checkbox onChange={({detail}) => {
                                        setPasswordCheckBox(detail.checked)
                                        detail.checked ? setPasswordTextType("text") : setPasswordTextType("password")
                                    }} checked={passwordCheckBox}>Show</Checkbox>
                                </FormField>
                            </ColumnLayout>
                        </Form>
                    </Container>
                </div>
                <div/>
            </Grid>
        </>
    )
}