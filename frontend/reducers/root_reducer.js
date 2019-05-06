import { combineReducers } from "redux";
import EntitiesReducer from "./entities_reducer";
import SessionReducer from './session_reducer';
import ErrorReducer from './error_reducer';
import UIReducer from "./ui_reducer";

export default combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
  errors: ErrorReducer,
  ui: UIReducer
});