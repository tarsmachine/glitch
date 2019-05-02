import React from 'react';
import NavBarContainer from './nav/navbar_container';
import {Route, Switch, Redirect} from "react-router-dom";
export default () => (
  <>
    <NavBarContainer />
    <Switch>
      <Route exact path="/" render={()=>null} />
      <Route exact path="/login" render={()=>null} />
      <Route exact path="/signup" render={()=>null} />
      <Redirect to="/" />
    </Switch>
  </>
);
