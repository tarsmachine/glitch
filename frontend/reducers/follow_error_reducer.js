import {FOLLOW_ERRORS} from "../actions/follow_actions";
export default (state={}, action)=>{
  Object.freeze(state);
  switch(action.type){
    case FOLLOW_ERRORS:
      return action.errors;
    default:
      return state;
  }

};