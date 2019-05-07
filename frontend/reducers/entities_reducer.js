import { combineReducers } from "redux";
import UserReducer from './user_reducer';
import SearchReducer from "./search_reducer";

export default combineReducers({
  users: UserReducer,
  search: SearchReducer
});