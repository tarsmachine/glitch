import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store";
import * as SessionActions from './actions/session_actions';
import Root from "./components/root";
import * as SessionAPIUtil from "./util/session_api_util";

document.addEventListener("DOMContentLoaded",()=>{
  let preloadedState;
  if (window.currentUser) {
    preloadedState = {
      entities:{
        users:{
          [window.currentUser.id]: window.currentUser
        }
      },
      session: {
        currentUserId: window.currentUser.id
      }
    };
    window.currentUser = undefined;
  }

  const store = configureStore(preloadedState);
  /*
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.SessionAPIUtil = SessionAPIUtil;
  window.SessionActions = SessionActions;
  window.log = (...e)=>console.log(...e);
  window.logErr = (e)=>console.log(`Error: ${e.responseJSON}`);*/
  
  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});