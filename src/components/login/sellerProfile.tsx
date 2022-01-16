import React, {useEffect, useState} from "react";
import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import SpaceBetween from "@awsui/components-react/space-between";
import Box from "@awsui/components-react/box";
import Input from "@awsui/components-react/input";
import Container from "@awsui/components-react/container";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../store/selectors/user/userProfileSelectors";
import cloneDeep from "lodash/fp/cloneDeep"
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";
import Button from "@awsui/components-react/button";
import Spinner from "@awsui/components-react/spinner";

export default () => {

    let dispatch = useDispatch()
    let userProfile = useSelector(getUserProfile)
    const [editMode, setEditMode] = useState(false)
    const [tempUserDetail, setTempUserDetail] = useState(userProfile)

    useEffect(() => {
        dispatch({
            type: UserProfileActionEnum.User_Profile_Pending,
            payload: { "profileType" : "SELLER"}
        })
    }, [])

    const setEditModeHandler = (previousEditState) => {
        if (previousEditState) {
            setTempUserDetail({
                error: "", loading: false, userProfiles: undefined
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
                    description="This is your business information used while you sell any product."
                >
                    Business Profile
                </Header>
            }
            footer={<SpaceBetween direction={'horizontal'} size={'l'}>
                <Button onClick={() => setEditModeHandler(editMode)} disabled={userProfile.loading}>{editMode ? "Back" :"Edit"}</Button>
                <Button onClick={() => onSubmitHandler()} disabled={userProfile.loading || !editMode} variant={'primary'}>Update</Button>
            </SpaceBetween>
            }
        >
            <ColumnLayout columns={2} variant="text-grid">
                {userProfile.loading ? <Spinner size={'large'}/> :
                <>
                <SpaceBetween size="l">
                    <div>
                        <Box variant="awsui-key-label"><code>Business Name</code></Box>
                        {editMode ? <small><Input value={tempUserDetail[0].name}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.name = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile[0].name}</small>}
                    </div>
                    <div>
                        <Box variant="awsui-key-label"><code>Phone Number</code></Box>
                        {editMode ? <small><Input value={tempUserDetail[0].phoneNumber}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.phoneNumber = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile[0].phoneNumber}</small>}
                    </div>
                    <div>
                        <ColumnLayout columns={2} variant="text-grid">
                            <div>
                                <Box variant="awsui-key-label"><code>PAN Number</code></Box>
                                {editMode ? <small><Input value={tempUserDetail[0].clientAdditionalDetail.panNumber}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.clientAdditionalDetail.panNumber = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile[0].clientAdditionalDetail?.panNumber}</small>}
                            </div>
                            <div>
                                <Box variant="awsui-key-label"><code>GSTIN Number</code></Box>
                                {editMode ? <small><Input value={tempUserDetail[0].clientAdditionalDetail?.gstIN}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.clientAdditionalDetail.gstIN = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile[0].clientAdditionalDetail?.gstIN}</small>}
                            </div>
                        </ColumnLayout>
                    </div>
                </SpaceBetween>
                <SpaceBetween size={"l"}>
                    <div>
                        <Box variant="awsui-key-label"><code>Business Address</code></Box>
                        {editMode ? <small><Input value={tempUserDetail[0].addressLine}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.addressLine = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile[0].addressLine}</small>}
                    </div>
                    <div>
                        <ColumnLayout columns={2} variant="text-grid">
                            <div>
                                <Box variant="awsui-key-label"><code>City</code></Box>
                                {editMode ? <small><Input value={tempUserDetail[0].city}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.city = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile[0].city}</small>}
                            </div>
                            <div>
                                <Box variant="awsui-key-label"><code>State</code></Box>
                                {editMode ? <small><Input value={tempUserDetail[0].state}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.state = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile[0].state}</small>}
                            </div>
                        </ColumnLayout>
                    </div>
                    <div>
                        <Box variant="awsui-key-label"><code>Pincode</code></Box>
                        {editMode ? <small><Input value={tempUserDetail[0].pincode.toString()}
                                                  type={'number'}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.pincode = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile[0].pincode}</small>}
                    </div>
                </SpaceBetween>
                </>}
            </ColumnLayout>
        </Container>
    )
}