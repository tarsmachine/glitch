import { SEARCH_LOADING } from "../actions/search_actions";

export default (state=false, action)=>{
  Object.freeze(state);

  switch(action.type){
    case SEARCH_LOADING:
      return action.searching;
    default:
      return state;
  }
};