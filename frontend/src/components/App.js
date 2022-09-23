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
import Subjects from "./common/Subjects.js";
import List from "./common/List.js";
import WelcomePage from "./common/WelcomePage.js";
import FormSession from "./sessions/FormSession.js";
import DetailsSession from "./sessions/DetailsSession.js";
import Soon from "./common/Soon.js";

import PracticeList from "./practice/PracticeList.js";
import PracticeDescriptionForm  from "./practice/PracticeDescriptionForm";
import DetailsPracticeDescription  from "./practice/DetailsPracticeDescription";
import ResultsPracticeDescription  from "./practice/ResultsPracticeDescription";
import PracticeIdentifyForm  from "./practice/PracticeIdentifyForm";
import DetailsPracticeIdentify  from "./practice/DetailsPracticeIdentify";
import ResultsPracticeIdentify  from "./practice/ResultsPracticeIdentify";
import MyPractice from "./practice/MyPractice.js";

import MySets from "./sets/MySets.js";
import DetailsSet from "./sets/DetailsSet.js";
import ListSets from "./sets/ListSets.js";

import MyClusters from "./clusters/MyClusters.js";
import DetailsCluster from "./clusters/DetailsCluster.js";
import ListClusters from "./clusters/ListClusters.js";






export default function App() {
  ReactGA.initialize('UA-187572377-1');
  let location = useLocation()
   store.dispatch(loadUser());
   const analytics = useAnalytics()
  useEffect(() => {
    analytics.page()
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  }, [location])
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

                  {/* <Route exact path="/cardiovascular" render={(props) => <Subjects {...props} block={`Cardiovascular`} />} /> */}
                  <PrivateRoute exact path="/cardiovascular/practice" component={(props) => <PracticeList {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Cardiovascular`}/>} />
                  <PrivateRoute exact path="/cardiovascular/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Cardiovascular`}/>} />
                  <PrivateRoute exact path="/cardiovascular/practice/identification" component={(props) => <PracticeIdentifyForm {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular" component={(props) => <List {...props} block={`Cardiovascular`}/>} />
                  <PrivateRoute exact path="/cardiovascular/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} />} />
                  <PrivateRoute exact path="/cardiovascular/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} />} />

                  {/* <PrivateRoute exact path="/cardiovascular/microbiology" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/microbiology/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/microbiology/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/microbiology/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/microbiology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Microbiology`}/>} /> */}
                  {/* <PrivateRoute exact path="/cardiovascular/imaging" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/cardiovascular/imaging/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/cardiovascular/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/cardiovascular/imaging/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/cardiovascular/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/cardiovascular/pathology" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/pathology/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/pathology/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/histology" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/histology/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/histology/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/cytology" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/cytology/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/cytology/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/cardiovascular/clinical" component={(props) => <List {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/cardiovascular/clinical/sets" component={(props) => <ListSets {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/cardiovascular/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/cardiovascular/clinical/clusters" component={(props) => <ListClusters {...props} block={`Cardiovascular`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/cardiovascular/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Cardiovascular`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/musculoskeletal" component={(props) => <Subjects {...props} block={`Musculoskeletal`} />} /> */}
                  <PrivateRoute exact path="/musculoskeletal/practice" component={(props) => <PracticeList {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/practice/identification" component={(props) => <PracticeIdentifyForm {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/identification/:id" component={(props) => <DetailsPracticeIdentify {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/identification/results/:id" component={(props) => <ResultsPracticeIdentify {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice" component={(props) => <PracticeList {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Musculoskeletal`}/>} />
                  <PrivateRoute exact path="/musculoskeletal" component={(props) => <List {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} />} />
                  <PrivateRoute exact path="/musculoskeletal/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} />} />
                  {/* <PrivateRoute exact path="/musculoskeletal/imaging" component={(props) => <List {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/imaging/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/imaging/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/pathology" component={(props) => <List {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/pathology/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/pathology/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/histology" component={(props) => <List {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/histology/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/histology/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/cytology" component={(props) => <List {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/cytology/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/cytology/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/clinical" component={(props) => <List {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/clinical/sets" component={(props) => <ListSets {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/clinical/clusters" component={(props) => <ListClusters {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/musculoskeletal/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Musculoskeletal`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/respiratory" component={(props) => <Subjects {...props} block={`Respiratory`} />} /> */}
                  <PrivateRoute exact path="/respiratory/practice" component={(props) => <PracticeList {...props} block={`Respiratory`} />} />
                  <PrivateRoute exact path="/respiratory/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Respiratory`} />} />
                  <PrivateRoute exact path="/respiratory/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Respiratory`}/>} />
                  <PrivateRoute exact path="/respiratory/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Respiratory`}/>} />
                  <PrivateRoute exact path="/respiratory" component={(props) => <List {...props} block={`Respiratory`} />} />
                  <PrivateRoute exact path="/respiratory/sets" component={(props) => <ListSets {...props} block={`Respiratory`}/>} />
                  <PrivateRoute exact path="/respiratory/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} />} />
                  <PrivateRoute exact path="/respiratory/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} />} />
                  <PrivateRoute exact path="/respiratory/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} />} />
                  {/* <PrivateRoute exact path="/respiratory/imaging" component={(props) => <List {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/respiratory/imaging/sets" component={(props) => <ListSets {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/respiratory/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/respiratory/imaging/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/respiratory/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/respiratory/pathology" component={(props) => <List {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/respiratory/pathology/sets" component={(props) => <ListSets {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/respiratory/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/respiratory/pathology/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/respiratory/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/respiratory/histology" component={(props) => <List {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/respiratory/histology/sets" component={(props) => <ListSets {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/respiratory/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/respiratory/histology/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/respiratory/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/respiratory/cytology" component={(props) => <List {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/respiratory/cytology/sets" component={(props) => <ListSets {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/respiratory/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/respiratory/cytology/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/respiratory/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/respiratory/clinical" component={(props) => <List {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/respiratory/clinical/sets" component={(props) => <ListSets {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/respiratory/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/respiratory/clinical/clusters" component={(props) => <ListClusters {...props} block={`Respiratory`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/respiratory/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Respiratory`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/hemOnc" component={(props) => <Subjects {...props} block={`Hematology/Oncology`} />} /> */}
                  <PrivateRoute exact path="/hemOnc/practice" component={(props) => <PracticeList {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Hematology/Oncology`}/>} />
                  <PrivateRoute exact path="/hemOnc/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Hematology/Oncology`}/>} />
                  <PrivateRoute exact path="/hemOnc" component={(props) => <List {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} />} />
                  <PrivateRoute exact path="/hemOnc/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} />} />
                  {/* <PrivateRoute exact path="/hemOnc/imaging" component={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/hemOnc/imaging/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/hemOnc/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/hemOnc/imaging/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/hemOnc/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/hemOnc/pathology" component={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/hemOnc/pathology/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/hemOnc/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/hemOnc/pathology/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/hemOnc/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/hemOnc/histology" component={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/hemOnc/histology/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/hemOnc/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/hemOnc/histology/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/hemOnc/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/hemOnc/cytology" component={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/hemOnc/cytology/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/hemOnc/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/hemOnc/cytology/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/hemOnc/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/hemOnc/clinical" component={(props) => <List {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/hemOnc/clinical/sets" component={(props) => <ListSets {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/hemOnc/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/hemOnc/clinical/clusters" component={(props) => <ListClusters {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/hemOnc/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Hematology/Oncology`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/neurology" component={(props) => <Subjects {...props} block={`Neurology`} />} /> */}
                  <PrivateRoute exact path="/neurology/practice" component={(props) => <PracticeList {...props} block={`Neurology`} />} />
                  <PrivateRoute exact path="/neurology/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Neurology`} />} />
                  <PrivateRoute exact path="/neurology/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Neurology`}/>} />
                  <PrivateRoute exact path="/neurology/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Neurology`}/>} />
                  <PrivateRoute exact path="/neurology" component={(props) => <List {...props} block={`Neurology`} />} />
                  <PrivateRoute exact path="/neurology/sets" component={(props) => <ListSets {...props} block={`Neurology`} />} />
                  <PrivateRoute exact path="/neurology/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} />} />
                  <PrivateRoute exact path="/neurology/clusters" component={(props) => <ListClusters {...props} block={`Neurology`}/>} />
                  <PrivateRoute exact path="/neurology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} />} />
                  {/* <PrivateRoute exact path="/neurology/imaging" component={(props) => <List {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/neurology/imaging/sets" component={(props) => <ListSets {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/neurology/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/neurology/imaging/clusters" component={(props) => <ListClusters {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/neurology/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/neurology/pathology" component={(props) => <List {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/neurology/pathology/sets" component={(props) => <ListSets {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/neurology/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/neurology/pathology/clusters" component={(props) => <ListClusters {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/neurology/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/neurology/histology" component={(props) => <List {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/neurology/histology/sets" component={(props) => <ListSets {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/neurology/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/neurology/histology/clusters" component={(props) => <ListClusters {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/neurology/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/neurology/cytology" component={(props) => <List {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/neurology/cytology/sets" component={(props) => <ListSets {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/neurology/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/neurology/cytology/clusters" component={(props) => <ListClusters {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/neurology/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/neurology/clinical" component={(props) => <List {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/neurology/clinical/sets" component={(props) => <ListSets {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/neurology/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/neurology/clinical/clusters" component={(props) => <ListClusters {...props} block={`Neurology`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/neurology/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Neurology`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/endocrine" component={(props) => <Subjects {...props} block={`Endocrine`} />} /> */}
                  <PrivateRoute exact path="/endocrine/practice" component={(props) => <PracticeList {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Endocrine`}/>} />
                  <PrivateRoute exact path="/endocrine/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Endocrine`}/>} />
                  <PrivateRoute exact path="/endocrine/practice/identification" component={(props) => <PracticeIdentifyForm {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/practice/identification/:id" component={(props) => <DetailsPracticeIdentify {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/practice/identification/results/:id" component={(props) => <ResultsPracticeIdentify {...props} block={`Endocrine`} />} />
                 
                  <PrivateRoute exact path="/endocrine" component={(props) => <List {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/sets" component={(props) => <ListSets {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} />} />
                  <PrivateRoute exact path="/endocrine/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} />} />
                  {/* <PrivateRoute exact path="/endocrine/imaging" component={(props) => <List {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/endocrine/imaging/sets" component={(props) => <ListSets {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/endocrine/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/endocrine/imaging/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/endocrine/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/endocrine/pathology" component={(props) => <List {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/endocrine/pathology/sets" component={(props) => <ListSets {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/endocrine/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/endocrine/pathology/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/endocrine/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/endocrine/histology" component={(props) => <List {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/endocrine/histology/sets" component={(props) => <ListSets {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/endocrine/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/endocrine/histology/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/endocrine/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/endocrine/cytology" component={(props) => <List {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/endocrine/cytology/sets" component={(props) => <ListSets {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/endocrine/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/endocrine/cytology/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/endocrine/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/endocrine/clinical" component={(props) => <List {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/endocrine/clinical/sets" component={(props) => <ListSets {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/endocrine/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/endocrine/clinical/clusters" component={(props) => <ListClusters {...props} block={`Endocrine`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/endocrine/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Endocrine`} subject={`Clinical`}/>} /> */}

                  {/* <PrivateRoute exact path="/gastrointestinal" component={(props) => <Subjects {...props} block={`Gastrointestinal`} />} /> */}


                  <PrivateRoute exact path="/gastrointestinal/practice" component={(props) => <PracticeList {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Gastrointestinal`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Gastrointestinal`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/practice/identification" component={(props) => <PracticeIdentifyForm {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/practice/identification/:id" component={(props) => <DetailsPracticeIdentify {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/practice/identification/results/:id" component={(props) => <ResultsPracticeIdentify {...props} block={`Gastrointestinal`} />} />

                  <PrivateRoute exact path="/gastrointestinal" component={(props) => <List {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} />} />
                  <PrivateRoute exact path="/gastrointestinal/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} />} />



                  {/* <PrivateRoute exact path="/gastrointestinal/imaging" component={(props) => <List {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/imaging/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/imaging/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/pathology" component={(props) => <List {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/pathology/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/pathology/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/histology" component={(props) => <List {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/histology/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/histology/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/cytology" component={(props) => <List {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/cytology/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/cytology/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/clinical" component={(props) => <List {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/clinical/sets" component={(props) => <ListSets {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/clinical/clusters" component={(props) => <ListClusters {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/gastrointestinal/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Gastrointestinal`} subject={`Clinical`}/>} /> */}
{/* 
                  <PrivateRoute exact path="/genitourinary" component={(props) => <Subjects {...props} block={`Genitourinary`} />} /> */}


                  
                  <PrivateRoute exact path="/genitourinary/practice" component={(props) => <PracticeList {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/practice/description" component={(props) => <PracticeDescriptionForm {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/practice/description/:id" component={(props) => <DetailsPracticeDescription {...props} block={`Genitourinary`}/>} />
                  <PrivateRoute exact path="/genitourinary/practice/description/results/:id" component={(props) => <ResultsPracticeDescription {...props} block={`Genitourinary`}/>} />
                  <PrivateRoute exact path="/genitourinary/practice/identification" component={(props) => <PracticeIdentifyForm {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/practice/identification/:id" component={(props) => <DetailsPracticeIdentify {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/practice/identification/results/:id" component={(props) => <ResultsPracticeIdentify {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary" component={(props) => <List {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} />} />
                  <PrivateRoute exact path="/genitourinary/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`}/>} />
                  <PrivateRoute exact path="/genitourinary/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`}/>} />



                  {/* <PrivateRoute exact path="/genitourinary/imaging" component={(props) => <List {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/genitourinary/imaging/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/genitourinary/imaging/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/genitourinary/imaging/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/genitourinary/imaging/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Imaging`}/>} />
                  <PrivateRoute exact path="/genitourinary/pathology" component={(props) => <List {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/genitourinary/pathology/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/genitourinary/pathology/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/genitourinary/pathology/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/genitourinary/pathology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Pathology`}/>} />
                  <PrivateRoute exact path="/genitourinary/histology" component={(props) => <List {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/genitourinary/histology/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/genitourinary/histology/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/genitourinary/histology/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/genitourinary/histology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Histology`}/>} />
                  <PrivateRoute exact path="/genitourinary/cytology" component={(props) => <List {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/genitourinary/cytology/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/genitourinary/cytology/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/genitourinary/cytology/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/genitourinary/cytology/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Cytology`}/>} />
                  <PrivateRoute exact path="/genitourinary/clinical" component={(props) => <List {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/genitourinary/clinical/sets" component={(props) => <ListSets {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/genitourinary/clinical/sets/:id" component={(props) => <DetailsSet {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/genitourinary/clinical/clusters" component={(props) => <ListClusters {...props} block={`Genitourinary`} subject={`Clinical`}/>} />
                  <PrivateRoute exact path="/genitourinary/clinical/clusters/:id" component={(props) => <DetailsCluster {...props} block={`Genitourinary`} subject={`Clinical`}/>} /> */}

                  <PrivateRoute exact path="/mypractice" component={MyPractice} />

                  <PrivateRoute exact path="/sets/details/sets/:id" component={DetailsSet} />
                  <PrivateRoute exact path="/mysets" component={MySets} />
                  <PrivateRoute exact path="/mysets/:id" component={(props) => <DetailsSet {...props} block={`.`} subject={`.`}/>} />

                  <PrivateRoute exact path="/clusters/details/clusters/:id" component={DetailsCluster} />
                  <PrivateRoute exact path="/myclusters" component={MyClusters} />
                  <PrivateRoute exact path="/myclusters/:id" component={(props) => <DetailsCluster {...props} block={`.`} subject={`.`}/>} />

                </Switch>
              </div> 
              </Fragment>

            
    );
  }

// ReactDOM.render([<App key="1" />, <Footer key="2" />], document.getElementById("app"));

