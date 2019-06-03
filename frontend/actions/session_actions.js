export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_ERROR = "LOGIN_ERROR";


import * as SessionAPIUtil from '../util/session_api_util';
import { receiveUser } from './user_actions';

export const signup = (user)=>dispatch=>SessionAPIUtil.signup(user)
  .then(res=>{
    dispatch(receiveUser(res));
    dispatch(loginUser(res));
    dispatch(clearSessionErrors());
  })
  .fail(e=>dispatch(loginError(e.responseJSON)));

export const login = (user)=>dispatch=>SessionAPIUtil.login(user)
  .then(res=>dispatch(loginUser(res)))
  .then(()=>dispatch(clearSessionErrors()))
  .fail(e=>dispatch(loginError(e.responseJSON)));

export const logout = ()=>dispatch=>SessionAPIUtil.logout()
  .then(()=>dispatch(logoutUser()))
  .then(()=>dispatch(clearSessionErrors()))
  .fail(e=>dispatch(loginError(e.responseJSON)));


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

export const clearSessionErrors = ()=>({
  type: LOGIN_ERROR,
  errors: {}
});


