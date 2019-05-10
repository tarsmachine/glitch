import { unfollowUser, followUser } from "../../actions/follow_actions";
import {connect} from "react-redux";
import FollowButton from "./follow_button";
const mSTP = (state, ownProps)=>({
  text: ownProps.currentUser.follows.includes(ownProps.username) ?
    `Unfollow` : `Follow`
});

const mDTP = (dispatch, ownProps)=>{
  const fn = ownProps.currentUser.follows.includes(ownProps.username) ?
    unfollowUser(ownProps.username) : followUser(ownProps.username);
   return {
    handleFollow: (cb)=>dispatch(fn).then(cb, cb)
  };
};

export default connect(mSTP, mDTP)(FollowButton);