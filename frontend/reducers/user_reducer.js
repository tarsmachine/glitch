import {LOGIN} from '../actions/session_actions';
import {RECEIVE_USER, RECEIVE_USERS, UPDATE_USER} from "../actions/user_actions";
import merge from 'lodash/merge';

export default (state={}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case LOGIN:
      return merge({}, state, {[action.user.username]: action.user});
    case UPDATE_USER:
      return merge({}, state, {[action.user.username]: action.user});
    case RECEIVE_USER:
      return merge({}, state, {[action.user.username]: action.user});
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    default:
      return state;
  }
};