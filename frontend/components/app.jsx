import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "../util/route_util";
import Index from "./index/index";
export default () => (
  <>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={Index} />
      <AuthRoute exact path="/login" component={Index} />
      <AuthRoute exact path="/signup" component={Index} />
      <Redirect to="/" />
    </Switch>
  </>
);
