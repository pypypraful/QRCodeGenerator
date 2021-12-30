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
import QRCodeBlock from "./QRCodeBlock";
import TextContent from "@awsui/components-react/text-content";

export default () => {

    const [supplierGSTIN, setSupplierGSTIN] = useState("")
    const [supplierUpiId, setSupplierUpiId] = useState("")
    const [payeeBankAccountNumber, setPayeeBankAccountNumber] = useState("")
    const [payeeBankIFSCCode, setPayeeBankIFSCCode] = useState("")
    const [invoiceNumber, setInvoiceNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [totalInvoiceValue, setTotalInvoiceValue] = useState("")
    const [totalTaxableValue, setTotalTaxableValue] = useState("")
    const [gstValue, setGstValue] = useState("")
    const [cgstValue, setCgstValue] = useState("")
    const [sgstValue, setSgstValue] = useState("")
    const [igstValue, setIgstValue] = useState("")
    const [cessValue, setCessValue] = useState("")

    const [processData, setProcessData] = useState(false)
    const [reset, setReset] = useState(true)

    useEffect(() => {
        setProcessData(false)
        setSupplierGSTIN("")
        setSupplierUpiId("")
        setPayeeBankAccountNumber("")
        setPayeeBankIFSCCode("")
        setInvoiceNumber("")
        setInvoiceDate("")
        setTotalInvoiceValue("")
        setTotalTaxableValue("")
        setGstValue("")
        setCgstValue("")
        setSgstValue("")
        setIgstValue("")
        setCessValue("")
    }, [reset])

    return(
        <>
            <Container
                header={
                    <Header
                        variant="h2"
                        description="Please fill each information carefully"
                    >
                        <SpaceBetween size={'xs'} direction={'horizontal'}>
                        Generate B2C GST compliant QR Code
                        <Popover
                            dismissButton={true}
                            position="right"
                            size="medium"
                            header="Help"
                            triggerType="custom"
                            content={
                                <TextContent>
                                    <ul>
                                        <li><small>All fields are optional</small></li>
                                        <li><small>Enter values carefully, as no validations are applied</small></li>
                                        <li><small>After Entering values, click on Submit Button. QR Code Image will be displayed below</small></li>
                                        <li><small>Click Reset Button, for resetting all values.</small></li>
                                        <li><small>You can download, scan, send the PNG image</small></li>
                                        <li><small>We do not claim 100% accuracy and security of QR Code.</small></li>
                                        <li><small>We do not store any entered data or QR Code.</small></li>
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
                            <Button variant="link" onClick={() => setReset(!reset)}>
                                Reset
                            </Button>
                            <Button variant="primary" onClick={() => setProcessData(true)}>Submit</Button>
                        </SpaceBetween>
                    }
                >
                    <ColumnLayout columns={3}>
                        <FormField label="Supplier GSTIN ">
                            <Input
                                value={supplierGSTIN}
                                onChange={event =>
                                    setSupplierGSTIN(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Supplier UPI Id ">
                            <Input
                                value={supplierUpiId}
                                onChange={event =>
                                    setSupplierUpiId(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Payee Bank Account Number">
                            <Input
                                value={payeeBankAccountNumber}
                                onChange={event =>
                                    setPayeeBankAccountNumber(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Payee Bank IFSC Code ">
                            <Input
                                value={payeeBankIFSCCode}
                                onChange={event =>
                                    setPayeeBankIFSCCode(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Invoice Number ">
                            <Input
                                value={invoiceNumber}
                                onChange={event =>
                                    setInvoiceNumber(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Invoice Date ">
                            <Input
                                value={invoiceDate}
                                onChange={event =>
                                    setInvoiceDate(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Total Invoice Value ">
                            <Input
                                value={totalInvoiceValue}
                                onChange={event =>
                                    setTotalInvoiceValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Total Taxable Value ">
                            <Input
                                value={totalTaxableValue}
                                onChange={event =>
                                    setTotalTaxableValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="GST Rate ">
                            <Input
                                value={gstValue}
                                onChange={event =>
                                    setGstValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="CGST Value ">
                            <Input
                                value={cgstValue}
                                onChange={event =>
                                    setCgstValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="SGST Value ">
                            <Input
                                value={sgstValue}
                                onChange={event =>
                                    setSgstValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="IGST Value ">
                            <Input
                                value={igstValue}
                                onChange={event =>
                                    setIgstValue(event.detail.value)
                                }
                            />
                        </FormField>
                        <FormField label="Cess Value ">
                            <Input
                                value={cessValue}
                                onChange={event =>
                                    setCessValue(event.detail.value)
                                }
                            />
                        </FormField>
                    </ColumnLayout>
                </Form>
            </Container>
            <br/>
            {
                processData ?
                    <QRCodeBlock payload={
                        {
                            supplierGSTIN: supplierGSTIN,
                            supplierUpiId: supplierUpiId,
                            payeeBankAccountNumber: payeeBankAccountNumber,
                            payeeBankIFSCCode: payeeBankIFSCCode,
                            invoiceNumber: invoiceNumber,
                            invoiceDate: invoiceDate,
                            totalInvoiceValue: totalInvoiceValue,
                            totalTaxableValue: totalTaxableValue,
                            gstValue: gstValue,
                            cgstValue: cgstValue,
                            sgstValue: sgstValue,
                            igstValue: igstValue,
                            cessValue: cessValue
                        }
                    }/>
                    : ""
            }
        </>
    )
}