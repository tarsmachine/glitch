import {LOGIN, LOGOUT} from '../actions/session_actions';

export default (state = {currentUserId: null}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case LOGIN:
      return {currentUserId: action.user.id};
    case LOGOUT:
      return {currentUserId: null};
    default:
      return state;
  }

};