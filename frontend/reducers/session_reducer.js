import {LOGIN, LOGOUT} from '../actions/session_actions';

export default (state = {currentUser: null}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case LOGIN:
      return {currentUser: action.user.username};
    case LOGOUT:
      return {currentUser: null};
    default:
      return state;
  }

};