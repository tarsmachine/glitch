import { connect } from "react-redux";
import Settings from "./settings";
import { updateUser, clearSessionErrors } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mSTP = state => {
  const currentUser = state.entities.users[state.session.currentUserId];
  const errors = state.errors.login;
  return {
    currentUser,
    errors
  };
};

const mDTP = dispatch => ({
  updateUser: (user) => dispatch(updateUser(user)),
  clearErrors: () => dispatch(clearSessionErrors())
});

export default withRouter(connect(mSTP, mDTP)(Settings));