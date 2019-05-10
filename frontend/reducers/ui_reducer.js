import { combineReducers } from "redux";
import LoadingReducer from "./loading_reducer";
import SearchUIReducer from "./search_ui_reducer";
import SearchingReducer from "./search_loading_reducer";

export default combineReducers({
  loading: LoadingReducer,
  searching: SearchingReducer,
  search: SearchUIReducer
});