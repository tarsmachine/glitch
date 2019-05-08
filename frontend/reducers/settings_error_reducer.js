import {SETTINGS_ERROR} from '../actions/user_actions';

export default (state = {}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case SETTINGS_ERROR:
      return action.errors;
    default:
      return state;
  }
};