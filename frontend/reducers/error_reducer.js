import { combineReducers } from "redux";
import LoginErrorReducer from './login_error_reducer';
import SettingsErrorReducer from "./settings_error_reducer";
import SearchErrorReducer from "./search_error_reducer";
import UserErrorReducer from "./user_error_reducer";
import VideoErrorReducer from "./video_error_reducer";
import FollowErrorReducer from "./follow_error_reducer";

export default combineReducers({
  login: LoginErrorReducer,
  settings: SettingsErrorReducer,
  search: SearchErrorReducer,
  user: UserErrorReducer,
  video: VideoErrorReducer,
  follows: FollowErrorReducer
});