import { VIDEO_ERRORS } from '../actions/video_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case VIDEO_ERRORS:
      return action.errors;
    default:
      return state;
  }
};