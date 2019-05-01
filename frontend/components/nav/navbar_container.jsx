import {connect} from "react-redux";
import Navbar from "./navbar";
import {login, signup, logout} from "../../actions/session_actions";

const mSTP = state => {
  const loggedIn = Boolean(state.session.currentUserId);
  const currentUser = loggedIn ? state.entities.users[state.session.currentUserId] : null;
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
  logout: ()=>dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);