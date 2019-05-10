import { RECEIVE_FOLLOWS } from "../actions/follow_actions";

export default (state = {}, action)=>{
    Object.freeze(state);
    switch(action.type){
      case RECEIVE_FOLLOWS:
        return action.follows;
      default:
        return state;
    }
};