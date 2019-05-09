import { TOP_VIDEOS, LATEST_VIDEOS } from '../actions/search_actions';
import merge from "lodash/merge";

export default (state = {top: {}, latest: {}}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case TOP_VIDEOS:
      delete newState.top;
      return merge(newState, {top: action.top||{}});
    case LATEST_VIDEOS:
      delete newState.latest;
      return merge(newState, {latest: action.latest||{}});
    default:
      return state;
  }
};