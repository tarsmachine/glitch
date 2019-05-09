import { connect } from "react-redux";
import VideoIndex from "./video_index";
import {fetchUserVideos} from "../../actions/video_actions";

const mSTP = (state, ownProps)=>{
  const user = state.entities.users[ownProps.match.params.username];
  const loading = state.ui.loading;
  const videos = [];
  if(user && user.videos) user.videos.forEach(video => {
    if(state.entities.videos[video]) videos.push(state.entities.videos[video]);
  });
  return {
    videos,
    loading
  };
};

const mDTP = (dispatch, ownProps)=>({
  fetchVideos: ()=>dispatch(fetchUserVideos(ownProps.match.params.username))
});

export default connect(mSTP, mDTP)(VideoIndex);