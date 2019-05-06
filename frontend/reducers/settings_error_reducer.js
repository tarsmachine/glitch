import {SETTINGS_ERROR} from '../actions/session_actions';

export default (state = {}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case SETTINGS_ERROR:
      return action.errors || {settings: "Unknown Error"};
    default:
      return state;
  }
};