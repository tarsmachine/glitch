import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthRoute, ProtectedRoute} from "../util/route_util";
import SettingsContainer from "./settings/settings_container";
import Index from "./index/index";
export default () => (
  <>
    <NavBarContainer />
    <div class="body">
      <Switch>
        <Route exact path="/" component={Index} />
        <AuthRoute exact path="/login" component={Index} />
        <AuthRoute exact path="/signup" component={Index} />
        <ProtectedRoute exact path="/settings" component={SettingsContainer} />
        <Redirect to="/" />
      </Switch>
    </div>
  </>
);
