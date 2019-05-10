import { connect } from "react-redux";
import Follows from "./follows";
import { fetchFollows } from "../../actions/follow_actions";

const mSTP = (state, ownProps) => ({
  follows: Object.values(state.entities.follows)
});
const mDTP = (dispatch, ownProps) => ({
  fetchFollows: () => dispatch(fetchFollows())
});

export default connect(mSTP, mDTP)(Follows);