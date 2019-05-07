import {connect} from "react-redux";
import Navbar from "./navbar";
import {login, signup, logout, clearSessionErrors} from "../../actions/session_actions";
import {withRouter} from "react-router-dom";

const mSTP = state => {
  const loggedIn = Boolean(state.session.currentUser);
  const currentUser = loggedIn ? state.entities.users[state.session.currentUser] : null;
  const errors = state.errors.login;
  return {
    loggedIn,
    currentUser,
    errors
  };
};

const mDTP = dispatch => ({
  login: (user)=>dispatch(login(user)),
  signup: (user)=>dispatch(signup(user)),
  logout: ()=>dispatch(logout()),
  clearErrors: ()=>dispatch(clearSessionErrors())
});

export default withRouter(connect(mSTP, mDTP)(Navbar));