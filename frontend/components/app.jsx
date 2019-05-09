import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthRoute, ProtectedRoute} from "../util/route_util";
import SettingsContainer from "./settings/settings_container";
import UserShowContainer from "./user/show_container";
import UploadContainer from "./video/upload_container";
import DirectoryContainer from "./user/directory_container";
import Index from "./index/index";
export default () => (
  <>
    <NavBarContainer />
    <div className="body">
      <Switch>
        <Route exact path="/" component={Index} />
        <AuthRoute exact path="/login" component={Index} />
        <AuthRoute exact path="/signup" component={Index} />
        <ProtectedRoute exact path="/videos/upload" component={UploadContainer} />
        <ProtectedRoute exact path="/settings" component={SettingsContainer} />
        <Route path="/directory" component={DirectoryContainer} />
        <Route path="/:username" component={UserShowContainer} />
        <Redirect to="/" />
      </Switch>
    </div>
  </>
);
