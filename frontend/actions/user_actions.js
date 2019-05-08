export const RECEIVE_USER = "RECEIVE_USER";
export const USER_ERROR = "USER_ERROR";
export const SETTINGS_ERROR = "LOGIN_ERROR";
export const UPDATE_USER = "UPDATE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";

import {setLoading} from "./ui_actions";


import * as UserAPIUtil from '../util/user_api_util';

export const fetchUser = (username) => dispatch => { 
  dispatch(setLoading(true));
  return UserAPIUtil.fetchUser(username)
  .then(res =>{
    dispatch(setLoading(false));
    dispatch(receiveUser(res));
  } )
  .then(() => dispatch(clearUserError()))
  .fail(e => {
    dispatch(setLoading(false));
    dispatch(userError(true));
  });
};

export const updateUser = (user) => dispatch => UserAPIUtil.updateUser(user)
  .then(e => dispatch(updateUserInfo(user)))
  .then(() => dispatch(clearSettingsErrors()))
  .fail(e => dispatch(settingsError(e.responseJSON)));

export const updateUserAvatar = (id, avatar) => dispatch => UserAPIUtil.updateUserAvatar(id, avatar)
  .then(user => dispatch(updateUserInfo(user)))
  .then(() => dispatch(clearSettingsErrors()))
  .fail(e => dispatch(settingsError(e.responseJSON)));

export const clearSettingsErrors = () => ({
  type: SETTINGS_ERROR,
  errors: {}
});

const settingsError = (errors) => ({
  type: SETTINGS_ERROR,
  errors
});

const updateUserInfo = (user) => ({
  type: UPDATE_USER,
  user
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});
const userError = (error) => ({
  type: USER_ERROR,
  error
});
const clearUserError = () => ({
  type: USER_ERROR,
  error: null
});

