import {SEARCH_RESULTS, CLEAR_RESULTS} from "../actions/search_actions";
import merge from "lodash/merge";
export default (state={}, action)=>{
  Object.freeze(state);
  switch (action.type){
    case CLEAR_RESULTS:
      return {};
    case SEARCH_RESULTS:
      return action.results;
    default:
      return state;
  }
};