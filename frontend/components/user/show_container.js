import Show from "./show";
import {connect} from "react-redux";
import {fetchUser} from "../../actions/user_actions";

const mSTP = (state,ownProps)=>({
  notFound: Boolean(state.errors.user),
  user: state.entities.users[ownProps.match.params.username],
  loading: state.ui.loading,
  currentUser: state.session.currentUser
});
const mDTP = (dispatch, ownProps)=>({
  fetchUser: ()=>dispatch(fetchUser(ownProps.match.params.username))
});

export default connect(mSTP, mDTP)(Show);