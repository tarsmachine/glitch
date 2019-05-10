import {LOGIN} from '../actions/session_actions';
import {RECEIVE_USER, RECEIVE_USERS, UPDATE_USER} from "../actions/user_actions";
import merge from 'lodash/merge';

export default (state={}, action)=>{
  Object.freeze(state);
  const newState = merge({}, state);
  switch(action.type){
    case LOGIN:
      newState[action.user.username] = action.user;
      return newState;
    case UPDATE_USER:
      return merge(newState, {[action.user.username]: action.user});
    case RECEIVE_USER:
      newState[action.user.username] = action.user;
      return newState;
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    default:
      return state;
  }
};