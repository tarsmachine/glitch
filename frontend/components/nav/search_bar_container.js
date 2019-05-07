import { connect } from "react-redux";
import SearchBar from "./search_bar";
import {searchType} from "../../actions/search_actions";
const mSTP = state=>({

});

const mDTP = dispatch => ({
  searchType: (q, type, limit, offset)=>dispatch(searchType(q, type, limit, offset))
});

export default connect(mSTP, mDTP)(SearchBar);