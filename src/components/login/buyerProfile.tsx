import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import SpaceBetween from "@awsui/components-react/space-between";
import Box from "@awsui/components-react/box";
import Input from "@awsui/components-react/input";
import Container from "@awsui/components-react/container";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../../store/selectors/user/userProfileSelectors";
import cloneDeep from "lodash/fp/cloneDeep"
import {UserProfileActionEnum} from "../../store/actions/user/userProfileAction";
import Button from "@awsui/components-react/button";
import Spinner from "@awsui/components-react/spinner";
import {initialUserProfile} from "../../store/state/models/userProfile";

export default () => {

    let dispatch = useDispatch()
    let userProfile = useSelector(getUserProfile)
    const [editMode, setEditMode] = useState(false)
    const [reload, setReload] = useState(false)
    const [tempUserDetail, setTempUserDetail] = useState(userProfile)

    useEffect(() => {
        dispatch({
            type: UserProfileActionEnum.User_Profile_Pending,
            payload: {profileType: "BUYER"}
        })
    }, [reload])

    const setEditModeHandler = (previousEditState) => {
        if (previousEditState) {
            setTempUserDetail(initialUserProfile)
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
                    description="This is your personal information used while you buy any product."
                >
                    Personal Profile
                </Header>
            }
            footer={<SpaceBetween direction={'horizontal'} size={'l'}>
                <Button onClick={() => setEditModeHandler(editMode)} disabled={userProfile.loading}>{editMode ? "Back" :"Edit"}</Button>
                <Button onClick={() => onSubmitHandler()} disabled={userProfile.loading || !editMode} variant={'primary'}>Update</Button>
            </SpaceBetween>
            }
        >
            <ColumnLayout columns={2} variant="text-grid">
                { userProfile.loading ? <Spinner size={'large'}/> : null}
                { userProfile.error ? <div><code>{userProfile.error}</code><Button variant="normal" onClick={() => setReload(!reload)}>Reload</Button></div> : null }
                { !userProfile.loading && !userProfile.error ?
                <>
                <SpaceBetween size="l">
                    <div>
                        <Box variant="awsui-key-label"><code>Name</code></Box>
                        {editMode ? <small><Input value={tempUserDetail?.name}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.name = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile?.name}</small>}
                    </div>
                    <div>
                        <Box variant="awsui-key-label"><code>Email</code></Box>
                        <small>{userProfile?.username}</small>
                    </div>
                    <div>
                        <Box variant="awsui-key-label"><code>Phone Number</code></Box>
                        {editMode ? <small><Input value={tempUserDetail?.phoneNumber}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.phoneNumber = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile?.phoneNumber}</small>}
                    </div>
                </SpaceBetween>
                <SpaceBetween size={"l"}>
                    <div>
                        <Box variant="awsui-key-label"><code>Address</code></Box>
                        {editMode ? <small><Input value={tempUserDetail?.addressLine}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.addressLine = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile?.addressLine}</small>}
                    </div>
                    <div>
                        <ColumnLayout columns={2} variant="text-grid">
                            <div>
                                <Box variant="awsui-key-label"><code>City</code></Box>
                                {editMode ? <small><Input value={tempUserDetail?.city}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.city = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile?.city}</small>}
                            </div>
                            <div>
                                <Box variant="awsui-key-label"><code>State</code></Box>
                                {editMode ? <small><Input value={tempUserDetail?.state}
                                                          onChange={({detail}) => {
                                                              let tmpUsr = cloneDeep(tempUserDetail)
                                                              tmpUsr.state = detail.value
                                                              setTempUserDetail(tmpUsr)
                                                          }}/>
                                </small> : <small>{userProfile?.state}</small>}
                            </div>
                        </ColumnLayout>
                    </div>
                    <div>
                        <Box variant="awsui-key-label"><code>Pincode</code></Box>
                        {/* @ts-ignore */}
                        {editMode ? <small><Input value={tempUserDetail?.pincode}
                                                  type={'number'}
                                                  onChange={({detail}) => {
                                                      let tmpUsr = cloneDeep(tempUserDetail)
                                                      tmpUsr.pincode = detail.value
                                                      setTempUserDetail(tmpUsr)
                                                  }}/>
                        </small> : <small>{userProfile?.pincode}</small>}
                    </div>
                </SpaceBetween>
                </>: null}
            </ColumnLayout>
        </Container>
    )
}