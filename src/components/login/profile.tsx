import React, {useEffect, useState} from "react";
import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import SpaceBetween from "@awsui/components-react/space-between";
import Box from "@awsui/components-react/box";
import {useDispatch, useSelector} from "react-redux";
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";
import {getUserProfile} from "../../store/selectors/user/userProfileSelectors";
import Input from "@awsui/components-react/input";
import Button from "@awsui/components-react/button";
import cloneDeep from "lodash/fp/cloneDeep"

export default () => {

    let dispatch = useDispatch()
    let userProfile = useSelector(getUserProfile)
    const [editMode, setEditMode] = useState(false)
    const [tempUserDetail, setTempUserDetail] = useState(userProfile)

    useEffect(() => {
        dispatch({
            type: UserProfileActionEnum.User_Profile_Pending
        })
    }, [])

    const setEditModeHandler = (previousEditState) => {
        if (previousEditState) {
            setTempUserDetail({
                businessProfile: undefined,
                customerProfile: undefined,
                error: "",
                loading: false,
                username: ""
            })
            setEditMode(false)
        } else {
            setTempUserDetail(userProfile)
            setEditMode(true)
        }
    }

    const onSubmitHandler = () => {
        dispatch({
            type: UserProfileActionEnum.User_Profile_Update,
            payload: tempUserDetail
        })
        setEditModeHandler(editMode)
    }

    return(
        <Container
            header={
                <Header
                    variant="h2"
                    description="You can update your personal information anytime. We do not sell any personal information."
                >
                    Profile
                </Header>
            }
            footer={<SpaceBetween direction={'horizontal'} size={'l'}>
                <Button onClick={() => setEditModeHandler(editMode)} disabled={userProfile.loading}>{editMode ? "Back" :"Edit"}</Button>
                <Button onClick={() => onSubmitHandler()} disabled={userProfile.loading || !editMode} variant={'primary'}>Update</Button>
            </SpaceBetween>
            }
        >
            <Container
                header={
                    <Header
                        variant="h2"
                        description="This is your personal information used while you buy any product."
                    >
                        Personal Profile
                    </Header>
                }
            >
                <ColumnLayout columns={2} variant="text-grid">
                    <SpaceBetween size="l">
                        <div>
                            <Box variant="awsui-key-label"><code>Name</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.customerProfile?.customerName}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.customerProfile.customerName = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.customerProfile?.customerName}</small>}
                        </div>
                        <div>
                            <Box variant="awsui-key-label"><code>Email</code></Box>
                            <small>{userProfile.username}</small>
                        </div>
                        <div>
                            <Box variant="awsui-key-label"><code>Phone Number</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.customerProfile?.customerPhoneNumber}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.customerProfile.customerPhoneNumber = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.customerProfile?.customerPhoneNumber}</small>}
                        </div>
                    </SpaceBetween>
                    <SpaceBetween size={"l"}>
                        <div>
                            <Box variant="awsui-key-label"><code>Address</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.customerProfile?.homeAddress.addressLine}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.customerProfile.homeAddress.addressLine = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.customerProfile?.homeAddress.addressLine}</small>}
                        </div>
                        <div>
                            <ColumnLayout columns={2} variant="text-grid">
                                <div>
                                    <Box variant="awsui-key-label"><code>City</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.customerProfile?.homeAddress.city}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.customerProfile.homeAddress.city = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.customerProfile?.homeAddress.city}</small>}
                                </div>
                                <div>
                                    <Box variant="awsui-key-label"><code>State</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.customerProfile?.homeAddress.state}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.customerProfile.homeAddress.state = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.customerProfile?.homeAddress.state}</small>}
                                </div>
                            </ColumnLayout>
                        </div>
                        <div>
                            <Box variant="awsui-key-label"><code>Pincode</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.customerProfile?.homeAddress.pincode.toString()}
                                                      type={'number'}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.customerProfile.homeAddress.pincode = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.customerProfile?.homeAddress.pincode}</small>}
                        </div>
                    </SpaceBetween>
                </ColumnLayout>
            </Container>
            <br/>
            <Container
                header={
                    <Header
                        variant="h2"
                        description="This is your business information used while you sell any product."
                    >
                        Business Profile
                    </Header>
                }
            >
                <ColumnLayout columns={2} variant="text-grid">
                    <SpaceBetween size="l">
                        <div>
                            <Box variant="awsui-key-label"><code>Business Name</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessName}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.businessProfile.businessName = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.businessProfile?.businessName}</small>}
                        </div>
                        <div>
                            <Box variant="awsui-key-label"><code>Phone Number</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessPhoneNumber}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.businessProfile.businessPhoneNumber = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.businessProfile?.businessPhoneNumber}</small>}
                        </div>
                        <div>
                            <ColumnLayout columns={2} variant="text-grid">
                                <div>
                                    <Box variant="awsui-key-label"><code>PAN Number</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.businessProfile?.panNumber}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.businessProfile.panNumber = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.businessProfile?.panNumber}</small>}
                                </div>
                                <div>
                                    <Box variant="awsui-key-label"><code>GSTIN Number</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.businessProfile?.gstIN}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.businessProfile.gstIN = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.businessProfile?.gstIN}</small>}
                                </div>
                            </ColumnLayout>
                        </div>
                    </SpaceBetween>
                    <SpaceBetween size={"l"}>
                        <div>
                            <Box variant="awsui-key-label"><code>Business Address</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessAddress.addressLine}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.businessProfile.businessAddress.addressLine = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.businessProfile?.businessAddress.addressLine}</small>}
                        </div>
                        <div>
                            <ColumnLayout columns={2} variant="text-grid">
                                <div>
                                    <Box variant="awsui-key-label"><code>City</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessAddress.city}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.businessProfile.businessAddress.city = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.businessProfile?.businessAddress.city}</small>}
                                </div>
                                <div>
                                    <Box variant="awsui-key-label"><code>State</code></Box>
                                    {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessAddress.state}
                                                              onChange={({detail}) => {
                                                                  let tmpUsr = cloneDeep(tempUserDetail)
                                                                  tmpUsr.businessProfile.businessAddress.state = detail.value
                                                                  setTempUserDetail(tmpUsr)
                                                              }}/>
                                    </small> : <small>{userProfile.businessProfile?.businessAddress.state}</small>}
                                </div>
                            </ColumnLayout>
                        </div>
                        <div>
                            <Box variant="awsui-key-label"><code>Pincode</code></Box>
                            {editMode ? <small><Input value={tempUserDetail.businessProfile?.businessAddress.pincode.toString()}
                                                      type={'number'}
                                                      onChange={({detail}) => {
                                                          let tmpUsr = cloneDeep(tempUserDetail)
                                                          tmpUsr.businessProfile.businessAddress.pincode = detail.value
                                                          setTempUserDetail(tmpUsr)
                                                      }}/>
                            </small> : <small>{userProfile.businessProfile?.businessAddress.pincode}</small>}
                        </div>
                    </SpaceBetween>
                </ColumnLayout>
            </Container>
        </Container>
    )
}