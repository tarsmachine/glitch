import {connect} from "react-redux";
import Directory from "./directory";
import {fetchUsers} from "../../actions/user_actions";

const mSTP = state => ({
  users: Object.values(state.entities.users).sort((a,b)=>a.username.localeCompare(b.username)),
  loading: state.ui.loading
});
const mDTP = dispatch => ({
  fetchUsers: (limit=100, offset=0) => dispatch(fetchUsers(limit, offset))
});

export default connect(mSTP, mDTP)(Directory);