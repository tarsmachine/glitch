import { USER_ERROR } from '../actions/user_actions';

export default (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case USER_ERROR:
      return action.error;
    default:
      return state;
  }
};