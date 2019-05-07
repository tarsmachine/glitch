import { combineReducers } from "redux";
import LoadingReducer from "./loading_reducer";
import SearchUIReducer from "./search_ui_reducer";
export default combineReducers({
  loading: LoadingReducer,
  search: SearchUIReducer
});