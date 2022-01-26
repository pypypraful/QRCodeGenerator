import React, {useState, useEffect} from "react"
import {Switch, Route, useHistory, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Auth from "@aws-amplify/auth"
import AppLayout from "@awsui/components-react/app-layout";
import Input from "@awsui/components-react/input";
import Button from "@awsui/components-react/button";
import Grid from "@awsui/components-react/grid";
import SideNavigation from "@awsui/components-react/side-navigation";
import TopNavigation, {TopNavigationProps} from "@awsui/components-react/top-navigation";
import GenerateQRCode from "./components/generateQRCode";
import ContactUs from "./components/contactUs/contactUs"
import SignUp from "./components/login/signup"
import Login from "./components/login/login"
import Home from "./components/home/home"
import SellerProducts from "./components/home/sellerHomePage"
import Inventory from "./components/inventory/inventory"
import UserProfile from "./components/login/profile"
import CustomerCart from "./components/customerCart/customerCart"
import {getUserCredentials} from "./store/selectors/user/credentialSelectors";
import {CredentialActionEnums} from "./store/actions/user/credentialAction";
import "@awsui/global-styles/index.css"
import Utility = TopNavigationProps.Utility;
import CART_SVG from "./svg/cart-svg";

const Navigation = () => {
    return(
        <SideNavigation
            items={[{ type: "link", text: "Generate QR Code", href: "/QRCodeGenerator" }]}
            header={{ text: "Gali Ki Dukaan", href: '/QRCodeGenerator' }}
        />
    )
}

const Content = ({isAuthenticated}) => {
  return(
      <Switch>
          <Route exact path={`/`} component={Home} />
          <Route exact path={`/products`} component={SellerProducts} />
          <Route exact path={`/QRCodeGenerator`} component={GenerateQRCode} />
          <Route exact path={`/contact`} component={ContactUs} />
          <Route exact path={`/signup`} component={SignUp} />
          <Route exact path={`/login`} component={Login} />
          {isAuthenticated ? <Route exact path={`/cart`} component={CustomerCart} /> : <Redirect to={'/login'}/> }
          {isAuthenticated ? <Route exact path={`/user/inventory`} component={Inventory} /> : <Redirect to={'/login'}/> }
          {isAuthenticated ? <Route exact path={`/user/profile`} component={UserProfile} /> : <Redirect to={'/login'}/> }
      </Switch>
  )
}

const serviceIdentity = { href: '/QRCodeGenerator', title: "Gali Ki Dukaan" }
const getUtilities = () => {
    const utilities : Array<Utility> = [
        { type:"button", text:"Shops", href:"/QRCodeGenerator" },
        { type:"button", iconSvg: CART_SVG, title:"CustomerCart", href:"/QRCodeGenerator/cart"}
    ]
    return utilities
}
const login = (isAuthenticated, user, handleLogOut, history) : Utility => {
    let items
    if (isAuthenticated) {
        items = [{id: "profile", text: "Profile"}, {id: "inventory", text: "Seller Inventory"}, {id: "logout", text: "Log out"}]
    } else {
        items = [
            { id: "login", text: "Login", href: "/QRCodeGenerator/login" },
            { id: "signup", text: "Sign Up", href: "/QRCodeGenerator/signup"}
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
            else if (detail.id === "inventory")
                history.push('/user/inventory')
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
    const [pincode, setPincode] = useState("")

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
                  search={<Grid gridDefinition={[{ colspan: 8 }, { colspan: 4 }]}>
                              <Input
                                  placeholder="Enter Pincode"
                                  ariaLabel="Search"
                                  value={pincode || userCredentials.pincode?.toString()}
                                  inputMode="numeric"
                                  type={'number'}
                                  onChange={({detail}) => setPincode(detail.value)}
                              />
                              <Button iconName="search" variant="icon" onClick={() => dispatch({
                                      type: CredentialActionEnums.Update_User_Pincode,
                                      payload: pincode
                                  })}/>
                          </Grid>
                  }
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
                  identity={{href: ""}}
                  i18nStrings={{ overflowMenuTriggerText: "More" }}
                  search={<Button onClick={() => history.push('/contact')}>CONTACT US</Button>}
              />
          </div>
      </>
  );
}

export default App;
