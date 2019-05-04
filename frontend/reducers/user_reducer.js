import {LOGIN, UPDATE_USER} from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state={}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case LOGIN:
      return merge({}, state, {[action.user.id]: action.user});
    case UPDATE_USER:
      return merge({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
};