import {LOGIN_ERROR} from '../actions/session_actions';

export default (state = [], action)=>{
  Object.freeze(state);
  switch(action.type){
    case LOGIN_ERROR:
      return action.errors;
    default:
      return state;
  }
};