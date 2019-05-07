import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthRoute, ProtectedRoute} from "../util/route_util";
import SettingsContainer from "./settings/settings_container";
import LoadingContainer from "./loading/loading_container";
import UserShow from "./user/show";
import Index from "./index/index";
export default () => (
  <>
    <LoadingContainer />
    <NavBarContainer />
    <div className="body">
      <Switch>
        <Route exact path="/" component={Index} />
        <AuthRoute exact path="/login" component={Index} />
        <AuthRoute exact path="/signup" component={Index} />
        <ProtectedRoute exact path="/settings" component={SettingsContainer} />
        <Route path="/:username" component={UserShow} />
        <Redirect to="/" />
      </Switch>
    </div>
  </>
);
