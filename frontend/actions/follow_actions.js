import * as FollowAPIUtil from "../util/follow_api_util";

import { receiveUser, receiveUsers } from "./user_actions";
import { setLoading } from "./ui_actions";

export const RECEIVE_FOLLOWS = "RECEIVE_FOLLOWS";
export const FOLLOW_ERRORS = "FOLLOW_ERRORS";

export const fetchFollows = ()=>dispatch=>{
  dispatch(setLoading(true));
  return FollowAPIUtil.fetchFollows()
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(receiveFollows(res));
    dispatch(receiveUsers(res));
    dispatch(clearFollowErrors());
  })
  .fail(err=>{
    dispatch(setLoading(false));
    dispatch(followErrors(err.responseJSON));
  });
};
export const followUser = (username)=>dispatch=>
  FollowAPIUtil.createFollow(username)
    .then(res=>{
      dispatch(receiveUser(res));
      dispatch(clearFollowErrors());
    })
    .fail(err=>{
      dispatch(followErrors(err.responseJSON));
  });

export const unfollowUser = (username)=>dispatch=>
  FollowAPIUtil.deleteFollow(username)
    .then(res => {
      dispatch(receiveUser(res));
      dispatch(clearFollowErrors());
    })
    .fail(err => {
      dispatch(followErrors(err.responseJSON));
  });


export const receiveFollows = (follows)=>({
  type: RECEIVE_FOLLOWS,
  follows
});
export const followErrors = (errors)=>({
  type: FOLLOW_ERRORS,
  errors
});
export const clearFollowErrors = (errors)=>({
  type: FOLLOW_ERRORS,
  errors: {}
});