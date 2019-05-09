import {fetchTopVideos, fetchLatestVideos, fetchUserTopVideos, fetchUserLatestVideos} from "../../actions/search_actions";
import Index from "./index";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";

const mSTP = state => ({
  topVideos: Object.values(state.entities.index.top),
  latestVideos: Object.values(state.entities.index.latest),
  loading: state.ui.loading
});

const mDTP = (dispatch, ownProps) => ({
  fetchLatestVideos: (limit=5, offset=0) => (ownProps.match && ownProps.match.params && ownProps.match.params.username) ?
      dispatch(fetchUserLatestVideos(ownProps.match.params.username, limit, offset))
    : dispatch(fetchLatestVideos(limit, offset)),
  fetchTopVideos: (limit=5, offset=0) => (ownProps.match && ownProps.match.params && ownProps.match.params.username) ?
      dispatch(fetchUserTopVideos(ownProps.match.params.username, limit, offset))
    : dispatch(fetchTopVideos(limit, offset))
});

export default withRouter(connect(mSTP, mDTP)(Index));