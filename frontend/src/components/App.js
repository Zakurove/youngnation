import React, { Component, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect, Routes, useLocation } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { useAnalytics } from 'use-analytics'
import { createBrowserHistory } from 'history';

import ReactGA from "react-ga";
import history from './utils/history';
//Alert OPTIONS
const alertOptions = {
  timeout: 3000,
  position: 'top center'
}

//Redux Stuff
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from '../actions/auth.js';

//Components
import Header from "./layout/Header.js";
import Footer from "./layout/Footer.js";
import Alerts from "./layout/Alerts.js";
import Login from "./accounts/Login.js";
import Register from "./accounts/Register.js";
import PrivateRoute from "./common/PrivateRoute.js";
import MainPage from "./common/MainPage.js";
import WelcomePage from "./common/WelcomePage.js";
import FormSession from "./sessions/FormSession.js";
import DetailsSession from "./sessions/DetailsSession.js";
import Soon from "./common/Soon.js";





export default function App() {
  // ReactGA.initialize('UA-187572377-1');
  // let location = useLocation()
  //  store.dispatch(loadUser());
  //  const analytics = useAnalytics()
  // useEffect(() => {
  //   analytics.page()
  //   ReactGA.set({ page: location.pathname })
  //   ReactGA.pageview(location.pathname)
  // }, [location])
    return (
      <Fragment>
            <Route path="/"  render={(props) => (props.location.pathname !=="/login" && props.location.pathname !=="/register" ) && 
              <Header />}> 
              </Route>   
              <div className="content p-0">
                <Switch>
                  <Route  path="/register" component={Register} />
                  <Route  path="/login" component={Login} />
                  {/* <Route  path="/welcome" component={WelcomePage} /> */}
                  <PrivateRoute exact path="/" component={WelcomePage} />
                  <PrivateRoute exact path="/soon" component={Soon} />
                  <PrivateRoute exact path="/session/create" component={(props) => <FormSession {...props} />} />
                  <PrivateRoute exact path="/session/:id" component={(props) => <DetailsSession {...props} />} />


                </Switch>
              </div> 
              </Fragment>

            
    );
  }

// ReactDOM.render([<App key="1" />, <Footer key="2" />], document.getElementById("app"));

