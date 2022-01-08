import React, {useState, useEffect} from "react"
import {Switch, Route, useHistory, Redirect} from 'react-router-dom'
import AppLayout from "@awsui/components-react/app-layout";
import GenerateQRCode from "./components/generateQRCode";
import ContactUs from "./components/contactUs/contactUs"
import SignUp from "./components/login/signup"
import Login from "./components/login/login"
import Inventory from "./components/inventory/inventory"
import UserProfile from "./components/login/profile"
import SideNavigation from "@awsui/components-react/side-navigation";
import "@awsui/global-styles/index.css"
import {Auth} from "aws-amplify"
import TopNavigation, {TopNavigationProps} from "@awsui/components-react/top-navigation";
import Utility = TopNavigationProps.Utility;
import {useDispatch, useSelector} from "react-redux";
import {getUserCredentials} from "./store/selectors/user/credentialSelectors";
import {CredentialActionEnums} from "./store/actions/user/credentialAction";

const Navigation = () => {
    return(
        <SideNavigation
            items={[{ type: "link", text: "Generate QR Code", href: "/QRCodeGenerator" }]}
            header={{ text: "QR Code Generator", href: '/QRCodeGenerator' }}
        />
    )
}

const Content = ({isAuthenticated}) => {
  return(
      <Switch>
        <Route exact path={`/`} component={GenerateQRCode} />
        <Route exact path={`/contact`} component={ContactUs} />
        <Route exact path={`/signup`} component={SignUp} />
        <Route exact path={`/login`} component={Login} />
          {isAuthenticated ? <Route exact path={`/user/inventory`} component={Inventory} /> : <Redirect to={'/login'}/> }
          {isAuthenticated ? <Route exact path={`/user/profile`} component={UserProfile} /> : <Redirect to={'/login'}/> }
      </Switch>
  )
}

const serviceIdentity = { href: '/QRCodeGenerator', title: "QR Code Generator" }
const getUtilities = () => {
    const utilities : Array<Utility> = [
        { type:"button", text:"INVENTORY", href:"/QRCodeGenerator/user/inventory" },
        { type:"button", text:"CONTACT US", href:"/QRCodeGenerator/contact" }]
    return utilities
}
const login = (isAuthenticated, user, handleLogOut, history) : Utility => {
    let items = []
    if (isAuthenticated) {
        items.push({
            id: "profile",
            text: "Profile"
        })
        items.push({
            id: "logout",
            text: "Log out"
        })
    } else {
        items = [
            {
                id: "login",
                text: "Login",
                href: "/QRCodeGenerator/login"
            },
            {
                id: "signup",
                text: "Sign Up",
                href: "/QRCodeGenerator/signup"
            }
        ]
    }

    return {
        type:"menu-dropdown",
        iconName:"user-profile",
        description: isAuthenticated ? user : null,
        items: items,
        onItemClick: ({detail}) => {
            if (detail.id === "logout")
                handleLogOut()
            else if (detail.id === "profile")
                history.push('/user/profile')
        }
    }
}

const App = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const userCredentials = useSelector(getUserCredentials)
    const [navigationOpen, setNavigationOpen] = useState(false)
    const [isAuthenticated, setLoggedIn] = React.useState(true);
    const [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            try {
                setUser(await Auth.currentAuthenticatedUser());
                if (user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (e) {
                setLoggedIn(false);
            }
        })();
    }, [userCredentials.email]);

    const handleLogOut = async () => {
        try {
            dispatch({
                type: CredentialActionEnums.User_Credentials_Logout,
                payload: { username: user['username']}
            })
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <>
          <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
              <TopNavigation
                  identity={serviceIdentity}
                  i18nStrings={{ overflowMenuTriggerText: "More" }}
                  utilities={[...getUtilities(), login(isAuthenticated, user['username'], handleLogOut, history)]}
              />
          </div>
          <AppLayout
              headerSelector="#h"
              footerSelector="#b"
              navigationOpen = {navigationOpen}
              onNavigationChange = {() => setNavigationOpen(!navigationOpen)}
              navigationWidth = {200}
              content ={<Content isAuthenticated={isAuthenticated}/>}
              navigationHide={false}
              navigation={<Navigation />}
              toolsHide={true}
              stickyNotifications={true}
          />
          <div id="b" style={{ position: 'sticky', bottom: 0, zIndex: 1002 }}>
              <TopNavigation
                  identity={{ href: '/QRCodeGenerator', title: "This application is for development purpose only, not commercial." }}
                  i18nStrings={{ overflowMenuTriggerText: "More" }}
              />
          </div>
      </>
  );
}

export default App;
