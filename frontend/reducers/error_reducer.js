import { combineReducers } from "redux";
import LoginErrorReducer from './login_error_reducer';
export default combineReducers({
  login: LoginErrorReducer
});