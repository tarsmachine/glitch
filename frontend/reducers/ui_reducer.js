import { combineReducers } from "redux";
import LoadingReducer from "./loading_reducer";

export default combineReducers({
  loading: LoadingReducer
});