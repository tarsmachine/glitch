import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store";
import * as SessionActions from './actions/session_actions';
import Root from "./components/root";
import * as SessionAPIUtil from "./util/session_api_util";
import * as UIActions from "./actions/ui_actions";
import * as SearchActions from "./actions/search_actions";


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
  //window.getState = store.getState;
  
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.SessionAPIUtil = SessionAPIUtil;
  window.SessionActions = SessionActions;
  window.setLoading = (b) => store.dispatch(UIActions.setLoading(b));
  window.log = (...e)=>console.log(...e);
  window.logErr = (e)=>console.log("Error:",e.responseJSON);
  window.SearchActions = SearchActions;
  
  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
});