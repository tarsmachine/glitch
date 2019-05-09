import { connect } from "react-redux";
import Upload from "./upload";
import { createVideo, clearVideoErrors } from "../../actions/video_actions";
import { withRouter } from "react-router-dom";

const mSTP = state => {
  const currentUser = state.entities.users[state.session.currentUser];
  const errors = state.errors.video;
  const loading = state.ui.loading;
  return {
    currentUser,
    errors
  };
};

const mDTP = dispatch => ({
  createVideo: (video) => dispatch(createVideo(video)),
  clearErrors: () => dispatch(clearVideoErrors()),
  setLoading: b => dispatch(setLoading(b)),
});

export default withRouter(connect(mSTP, mDTP)(Upload));