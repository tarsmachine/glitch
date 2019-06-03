import { connect } from "react-redux";
import Edit from "./edit";
import {  deleteVideo, receiveVideo, clearVideoErrors, videoErrors, fetchVideo, editVideo, fetchUserVideos } from "../../actions/video_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.currentUser];
  const errors = state.errors.video;
  const loading = state.ui.loading;
  const video = state.entities.videos[ownProps.match.params.videoId];
  return {
    currentUser,
    errors,
    video,
    loading
  };
};

const mDTP = (dispatch, ownProps) => ({
  fetchVideo: () => dispatch(fetchVideo(ownProps.match.params.videoId)),
  fetchUserVideos: ()=>dispatch(fetchUserVideos(ownProps.match.params.username)),
  receiveVideo: (video) => dispatch(receiveVideo(video)),
  editVideo: (video) => dispatch(editVideo(video)),
  videoErrors: (errors) => dispatch(videoErrors(errors)),
  deleteVideo: (videoId) => dispatch(deleteVideo(videoId)),
  clearErrors: () => dispatch(clearVideoErrors()),
  setLoading: b => dispatch(setLoading(b)),
});

export default withRouter(connect(mSTP, mDTP)(Edit));