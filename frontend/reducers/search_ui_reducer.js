import {SHOW_SEARCH, SEARCH_OFFSET} from "../actions/search_actions";

export default (state = {showing: false, offset: 0}, action)=>{
  Object.freeze(state);
  const newState=Object.assign({}, state);
  switch (action.type) {
    case SHOW_SEARCH:
      newState.showing = action.value;
      return newState;
    case SEARCH_OFFSET:
      newState.offset = action.offset;
      return newState;
    default:
      return state;
  }
};