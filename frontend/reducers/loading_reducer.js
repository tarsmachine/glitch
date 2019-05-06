import { LOADING } from '../actions/ui_actions';

export default (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case LOADING:
      return action.value;
    default:
      return state;
  }
};