import {connect} from "react-redux";
import VideoShow from "./video_show";
import {fetchVideo} from "../../actions/video_actions";

const mSTP = (state, ownProps) =>({
  user: state.entities.users[ownProps.match.params.username],
  video: state.entities.videos[ownProps.match.params.videoId],
  currentUser: state.entities.users[state.session.currentUser]
});
const mDTP = (dispatch, ownProps) => ({
  fetchVideo: ()=>dispatch(fetchVideo(ownProps.match.params.videoId))
});

export default connect(mSTP, mDTP)(VideoShow);