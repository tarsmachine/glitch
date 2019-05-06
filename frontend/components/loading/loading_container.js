import loading from "./loading";
import {connect} from "react-redux";

const mSTP = state=>({
  loading: state.ui.loading
});

export default connect(mSTP, null)(loading);