import React, {useState} from "react"
import QRCode from 'qrcode'
import ColumnLayout from "@awsui/components-react/column-layout"
import Container from "@awsui/components-react/container"
import Header from "@awsui/components-react/header"
import Spinner from "@awsui/components-react/spinner"

export default (props) => {

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const {
        supplierGSTIN,
        supplierUpiId,
        payeeBankAccountNumber,
        payeeBankIFSCCode,
        invoiceNumber,
        invoiceDate,
        totalInvoiceValue,
        gstValue,
        cgstValue,
        sgstValue,
        igstValue,
        cessValue
    } = props.payload

    let url = "upi://pay?pa=" +   // payment method.
        supplierUpiId +         // VPA number.
        "&am="+ totalInvoiceValue +       // this param is for fixed amount (non editable).
        // "&pn=Prasahnt%20Verma"+      // to showing your name in app.
        "&cu=INR" +                  // Currency code.
        "&mode=02" +                 // mode O2 for Secure QR Code.
        "&orgid=000000" +
        "&gstin=" + supplierGSTIN +
        "&invoiceNo=" + invoiceNumber +
        "&invoiceDate=" + invoiceDate +
        "&ifsc=" + payeeBankIFSCCode +
        "&accountNo=" + payeeBankAccountNumber +
        "gstValue=" + gstValue

        QRCode.toDataURL(url)
        .then(url => {
            setImageUrl(url)
            setLoading(false)
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })

    return(
        <Container
            header={
                <Header
                    variant="h2"
                    description="Please find below your QR Code"
                >
                    QR Code
                </Header>
            }
        >
            <ColumnLayout columns={3}>
                <div></div>
                <div>
                    <img src={imageUrl} />
                    {loading ? <Spinner size="large" /> : ""}
                </div>
                <div></div>
            </ColumnLayout>
        </Container>
    )
}