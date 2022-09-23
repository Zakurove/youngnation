import React, { Component, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect, useLocation} from 'react-router-dom';
import App from './components/App';
import Footer from './components/layout/Footer';
import AlertTemplate from 'react-alert-template-basic';
import Alerts from "./components/layout/Alerts.js";
//Redux Stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/auth.js';
import { Provider as AlertProvider } from 'react-alert';
//Analytics Stuff
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import { AnalyticsProvider } from 'use-analytics'
import usePageTracking from "./components/layout/usePageTracking";

//Alert OPTIONS
const alertOptions = {
    timeout: 3000,
    position: 'top center'
  }


//Analytics OPTIONS
  const analytics = Analytics({
    app: 'tawassam',
    plugins: [
      googleAnalytics({
        trackingId: 'UA-179977978-1',
      })
    ]
  })

ReactDOM.render([
    
    <Provider store={store}>
    <AlertProvider template={ AlertTemplate } {...alertOptions}>
    <AnalyticsProvider instance={analytics}>
    <Router>
    <Fragment>
    <Alerts />
    <App key="1" className="" />
    </Fragment>
     </Router>
     </AnalyticsProvider>
    </AlertProvider>
   </Provider>
    
    , <Footer key="2" />], document.getElementById("app"));