import SearchDropdown from "./search_dropdown";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const mSTP = (state, ownProps)=>({
  results: state.entities.search,
  loading: state.ui.loading
});

const mDTP = (dispatch, ownProps)=>({

});
export default withRouter(connect(mSTP, mDTP)(SearchDropdown));