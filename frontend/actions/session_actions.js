export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SETTINGS_ERROR = "LOGIN_ERROR";
export const UPDATE_USER = "UPDATE_USER";

import * as SessionAPIUtil from '../util/session_api_util';

export const signup = (user)=>dispatch=>SessionAPIUtil.signup(user)
  .then(res=>dispatch(loginUser(res)))
  .then(()=>dispatch(clearSessionErrors()))
  .fail(e=>dispatch(loginError(e.responseJSON)));

export const login = (user)=>dispatch=>SessionAPIUtil.login(user)
  .then(res=>dispatch(loginUser(res)))
  .then(()=>dispatch(clearSessionErrors()))
  .fail(e=>dispatch(loginError(e.responseJSON)));

export const logout = ()=>dispatch=>SessionAPIUtil.logout()
  .then(()=>dispatch(logoutUser()))
  .then(()=>dispatch(clearSessionErrors()))
  .fail(e=>dispatch(loginError(e.responseJSON)));

export const updateUser = (user) => dispatch => SessionAPIUtil.updateUser(user)
  .then(e=>dispatch(updateUserInfo(user)))
  .then(()=>dispatch(clearSettingsErrors()))
  .fail(e=>dispatch(settingsError(e.responseJSON)));

export const updateUserAvatar = (id, avatar) => dispatch => SessionAPIUtil.updateUserAvatar(id, avatar)
  .then(user=>dispatch(updateUserInfo(user)))
  .then(()=>dispatch(clearSettingsErrors()))
  .fail(e=>dispatch(settingsError(e.responseJSON)));

const loginUser = (user)=>({
  type: LOGIN,
  user
});

const logoutUser = ()=>({
  type: LOGOUT
});

const loginError = (errors)=>({
  type: LOGIN_ERROR,
  errors
});

const settingsError = (errors)=>({
  type: SETTINGS_ERROR,
  errors
});

const updateUserInfo = (user)=>({
  type: UPDATE_USER,
  user
});

export const clearSessionErrors = ()=>({
  type: LOGIN_ERROR,
  errors: {}
});

export const clearSettingsErrors = ()=>({
  type: SETTINGS_ERROR,
  errors: {}
});

