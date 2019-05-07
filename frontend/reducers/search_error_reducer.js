import { SEARCH_ERRORS } from '../actions/search_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SEARCH_ERRORS:
      return action.errors;
    default:
      return state;
  }
};