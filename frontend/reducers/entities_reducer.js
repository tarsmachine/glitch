import { combineReducers } from "redux";
import UserReducer from './user_reducer';
import SearchReducer from "./search_reducer";
import VideoReducer from "./video_reducer";
import IndexReducer from "./index_reducer";
import FollowsReducer from "./follows_reducer";

export default combineReducers({
  users: UserReducer,
  search: SearchReducer,
  videos: VideoReducer,
  index: IndexReducer,
  follows: FollowsReducer
});