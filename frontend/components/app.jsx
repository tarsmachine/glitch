import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
import {AuthRoute, ProtectedRoute} from "../util/route_util";
import SettingsContainer from "./settings/settings_container";
import UserShowContainer from "./user/show_container";
import UploadContainer from "./video/upload_container";
import DirectoryContainer from "./user/directory_container";
import IndexContainer from "./index/index_container";
import FollowsContainer from './user/follows_container';
import EditVideoContainer from "./video/edit_container";

export default () => (
  <>
    <NavBarContainer />
    <div className="body">
      <Switch>
        <Route exact path="/" component={IndexContainer} />
        <AuthRoute exact path="/login" component={IndexContainer} />
        <AuthRoute exact path="/signup" component={IndexContainer} />
        <ProtectedRoute exact path="/videos/upload" component={UploadContainer} />
        <ProtectedRoute exact path="/settings" component={SettingsContainer} />
        <Route path="/directory" component={DirectoryContainer} />
        <Route path="/following" component={FollowsContainer} />
        <ProtectedRoute path="/:username/videos/:videoId/edit" component={EditVideoContainer} />
        <Route path="/:username" component={UserShowContainer} />
        <Redirect to="/" />
      </Switch>
    </div>
  </>
);
