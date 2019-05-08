import { connect } from "react-redux";
import Settings from "./settings";
import { updateUser, clearSettingsErrors, updateUserAvatar } from "../../actions/user_actions";
import { setLoading } from "../../actions/ui_actions";
import { withRouter } from "react-router-dom";

const mSTP = state => {
  const currentUser = state.entities.users[state.session.currentUser];
  const errors = state.errors.login;
  return {
    currentUser,
    errors
  };
};

const mDTP = dispatch => ({
  updateUser: (user) => dispatch(updateUser(user)),
  clearErrors: () => dispatch(clearSettingsErrors()),
  setLoading: b=> dispatch(setLoading(b)),
  updateUserAvatar: (id, avatar)=>dispatch(updateUserAvatar(id, avatar)),
});

export default withRouter(connect(mSTP, mDTP)(Settings));