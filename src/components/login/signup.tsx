import React, {useEffect, useState} from "react"
import Button from "@awsui/components-react/button"
import ColumnLayout from "@awsui/components-react/column-layout"
import Container from "@awsui/components-react/container"
import Form from "@awsui/components-react/form"
import FormField from "@awsui/components-react/form-field"
import Header from "@awsui/components-react/header"
import Input from "@awsui/components-react/input"
import Link from "@awsui/components-react/link"
import SpaceBetween from "@awsui/components-react/space-between";
import Popover from "@awsui/components-react/popover"
import TextContent from "@awsui/components-react/text-content";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Flashbar from "@awsui/components-react/flashbar"
import Grid from "@awsui/components-react/grid";
import Checkbox from "@awsui/components-react/checkbox";

export default () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordCheckBox, setPasswordCheckBox] = useState(false)
    const [passwordTextType, setPasswordTextType] = useState("password")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [flashbarItem, setFlashbarItem] = useState([])
    const [confirmationCode, setConfirmationCode] = useState("")
    const [validationError, setValidationError] = useState({email: null, name: null, phoneNumber: null, password: null, confirmPassword: null})
    const [confirm, setConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const [reset, setReset] = useState(true)

    useEffect(() => {
        setName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setConfirmPassword("")
        setFlashbarItem([])
        setConfirmationCode("")
    }, [reset])

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFlashbarItem([{
            type: "info",
            loading: loading,
            content: "Creating new account, Please wait...",
            dismissible: true,
            onDismiss: () => setFlashbarItem([])
        }])
        try {
            await Auth.signUp({
                username: email,
                password: confirmPassword,
                attributes: {
                    name: name,
                    email: email,
                    phone_number: phoneNumber
                },
            });
            setFlashbarItem([{
                type: "success",
                content: "New account created successfully. Please verify the account now!!",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            setConfirm(true)
            setLoading(false)
        } catch (error) {
            console.error();
            setFlashbarItem([{
                type: "error",
                content: `New account creation failed. ${error.message}. Please try again!!`,
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            setLoading(false)
        }
    }

    const resendConfirmationCode = async () => {
        setLoading(true)
        setFlashbarItem([{
            type: "info",
            loading: loading,
            content: "Resending new confirmation code, Please wait...",
            dismissible: true,
            onDismiss: () => setFlashbarItem([])
        }])
        try {
            await Auth.resendSignUp(email);
            setFlashbarItem([{
                type: "success",
                content: "New confirmation code sent successfully. Please verify the account now!!",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            setLoading(false)
        } catch (error) {
            console.error(error);
            setFlashbarItem([{
                type: "error",
                content: "New confirmation code creation failed. Please try again!!",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            setLoading(false)
        }
    }

    const submitConfirmationCode = async (e) => {
        e.preventDefault()
        setFlashbarItem([{
            type: "info",
            loading: "true",
            content: "Submitting confirmation code, Please wait...",
            dismissible: true,
            onDismiss: () => setFlashbarItem([])
        }])
        try {
            await Auth.confirmSignUp(email, confirmationCode);
            setFlashbarItem([{
                type: "success",
                content: "New Account verified successfully!! Redirecting to Sign in page in 5 seconds.",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
            setTimeout(() => history.push("/login"), 5000);
        } catch (error) {
            console.error(error);
            setFlashbarItem([{
                type: "error",
                content: "New confirmation code creation failed. Please try again!!",
                dismissible: true,
                onDismiss: () => setFlashbarItem([])
            }])
        }
    }

    const validateForm = (field, value) => {
        switch (field) {
            case "name":
                if(value.length == 0 || value.length >32)
                    setValidationError({...validationError, name: "Name cannot be empty or greater than 32 characters"})
                else
                    setValidationError({...validationError, name: null})
                break;
            case "email":
                let Email_Regex = new RegExp(/[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+/i);
                if (!Email_Regex.test(value))
                    setValidationError({...validationError, email: "Please enter correct email"})
                else
                    setValidationError({...validationError, email: null})
                break;
            case "password":
                let passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
                if (!passwordRegex.test(value))
                    setValidationError({...validationError, password: "Your password should be at least 8 char long, including at least one capital & small alphabet, one number & one special character"})
                else
                    setValidationError({...validationError, password: null})
                break
            case "confirmPassword":
                if (password !== value)
                    setValidationError({...validationError, confirmPassword: "Password didn't matched"})
                else
                    setValidationError({...validationError, confirmPassword: null})
                break
            case "phoneNumber":
                let phoneNumberRegex = new RegExp(/^\+[1-9]{1}[0-9]{7,14}$/)
                if (!phoneNumberRegex.test(value))
                    setValidationError({...validationError, phoneNumber: "Enter phone number with format +CCNNNNNNNNN, C is country code and N is actual number"})
                else
                    setValidationError({...validationError, phoneNumber: null})
                break
            default:
                console.log("No Operation!!")
        }
    }

    return(
        <>
            <Grid gridDefinition={[{ colspan: { default: 12, xs:2,  s: 4 } }, { colspan: { default: 12, xs:8, s:4 } }, { colspan: { default: 12, xs:2, s:4 } }]}>
                <div/>
                <div>
                    <Flashbar items={flashbarItem}/>
                    {!confirm ?
                    <Container
                        header={
                            <Header
                                variant="h2"
                                description="Please fill each information carefully"
                            >
                                <SpaceBetween size={'xs'} direction={'horizontal'}>
                                    Sign Up
                                    <Popover
                                        dismissButton={true} position="right" size="medium" header="Help" triggerType="custom"
                                        content={
                                            <TextContent>
                                                <ul>
                                                    <li><small>All fields are mandatory</small></li>
                                                    <li><small>Click Reset Button, for resetting all values.</small></li>
                                                </ul>
                                            </TextContent>
                                        }
                                    >
                                        <Link variant="info"> Info</Link>
                                    </Popover>
                                </SpaceBetween>
                            </Header>
                        }
                    >
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="link" onClick={() => setReset(!reset)} disabled={loading}>
                                        Reset
                                    </Button>
                                    <Button variant="primary" onClick={(e) => handleSubmit(e)}
                                            disabled={loading || !(name && email && confirmPassword && phoneNumber && Object.values(validationError).every(element => element === null))}>
                                        Submit
                                    </Button>
                                </SpaceBetween>
                            }
                        >
                            <ColumnLayout columns={1}>
                                <FormField label="Name*" errorText={validationError.name}>
                                    <Input
                                        value={name}
                                        type={'text'}
                                        onChange={event => {
                                            setName(event.detail.value)
                                            validateForm("name", event.detail.value)
                                        }}
                                    />
                                </FormField>
                                <FormField label="Email*" errorText={validationError.email}>
                                    <Input
                                        value={email}
                                        inputMode="email"
                                        onChange={event =>{
                                            setEmail(event.detail.value)
                                            validateForm("email", event.detail.value)
                                        }}
                                    />
                                </FormField>
                                <FormField label="Password*" errorText={validationError.password}>
                                    <Input
                                        value={password}
                                        // @ts-ignore
                                        type={passwordTextType}
                                        onChange={event => {
                                            setPassword(event.detail.value)
                                            validateForm("password", event.detail.value)
                                        }}
                                    />
                                    <Checkbox onChange={({detail}) => {
                                        setPasswordCheckBox(detail.checked)
                                        detail.checked ? setPasswordTextType('text') : setPasswordTextType("password")
                                    }} checked={passwordCheckBox}>Show</Checkbox>
                                </FormField>
                                <FormField label="Confirm Password*" errorText={validationError.confirmPassword}>
                                    <Input
                                        value={confirmPassword}
                                        // @ts-ignore
                                        type={passwordTextType}
                                        onChange={event => {
                                            setConfirmPassword(event.detail.value)
                                            validateForm("confirmPassword", event.detail.value)
                                        }}
                                    />
                                </FormField>
                                <FormField label="Phone Number*" errorText={validationError.phoneNumber}>
                                    <Input
                                        value={phoneNumber}
                                        onChange={event => {
                                            setPhoneNumber(event.detail.value)
                                            validateForm("phoneNumber", event.detail.value)
                                        }}
                                    />
                                </FormField>
                            </ColumnLayout>
                        </Form>
                    </Container>
                        :
                    <Container
                        header={
                            <Header
                                variant="h2"
                                description="Confirmation code sent to your mail. Please enter that code below"
                            >
                                <SpaceBetween size={'xs'} direction={'horizontal'}>
                                    Verify your identity
                                </SpaceBetween>
                            </Header>
                        }
                    >
                        <Form
                            actions={
                                <SpaceBetween direction="horizontal" size="xs">
                                    <Button variant="link" onClick={() => setConfirm(!confirm)} disabled={loading}>Back</Button>
                                    <Button variant="primary" onClick={(e) => submitConfirmationCode(e)} disabled={loading || !confirmationCode}>Submit</Button>
                                </SpaceBetween>
                            }
                        >
                            <Grid gridDefinition={[{ colspan: 7 }, { colspan: 5 }]}>
                                <FormField label="Confirmation Code">
                                    <Input
                                        value={confirmationCode}
                                        onChange={event => setConfirmationCode(event.detail.value)}
                                    />
                                </FormField>
                                <FormField label={"."}>
                                    <Button variant="primary" onClick={resendConfirmationCode} disabled={loading}>Resend Code</Button>
                                </FormField>
                            </Grid>
                        </Form>
                    </Container>
                        }
                </div>
                <div/>
            </Grid>
        </>
    )
}