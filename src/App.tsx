import React, {useState} from "react"
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import AppLayout from "@awsui/components-react/app-layout";
import GenerateQRCode from "./components/generateQRCode";
import ContactUs from "./components/contactUs/contactUs"
import SideNavigation from "@awsui/components-react/side-navigation";
import "@awsui/global-styles/index.css"
import TopNavigation, {TopNavigationProps} from "@awsui/components-react/top-navigation";
import Utility = TopNavigationProps.Utility;

const Navigation = () => {
    return(
        <SideNavigation
            items={[{ type: "link", text: "Generate QR Code", href: "/QRCodeGenerator" }]}
            header={{ text: "QR Code Generator", href: '/QRCodeGenerator' }}
        />
    )
}

const Content = () => {
  return(
      <Switch>
        <Route exact path={`/`} component={GenerateQRCode} />
        <Route exact path={`/contact`} component={ContactUs} />
      </Switch>
  )
}

const serviceIdentity = { href: '/QRCodeGenerator', title: "QR Code Generator" }
const utilities : Utility = { type:"button", "text":"CONTACT US", "href":"/QRCodeGenerator/contact" }

const App = () => {
    const [navigationOpen, setNavigationOpen] = useState(false)

  return (
      <>
          <div id="h" style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
              <TopNavigation
                  identity={serviceIdentity}
                  i18nStrings={{ overflowMenuTriggerText: "More" }}
                  utilities={[utilities]}
              />
          </div>
          <BrowserRouter basename={'/QRCodeGenerator'}>
              <AppLayout
                  headerSelector="#h"
                  footerSelector="#b"
                  navigationOpen = {navigationOpen}
                  onNavigationChange = {() => setNavigationOpen(!navigationOpen)}
                  navigationWidth = {200}
                  content ={<Content />}
                  navigationHide={false}
                  navigation={<Navigation />}
                  toolsHide={true}
                  stickyNotifications={true}
              />
          </BrowserRouter>
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
