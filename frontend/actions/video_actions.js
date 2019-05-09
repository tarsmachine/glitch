export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const VIDEO_ERRORS = "VIDEO_ERRORS";

import { setLoading } from "./ui_actions";
import { fetchUser } from "./user_actions";

import * as VideoAPIUtil from '../util/video_api_util';

export const fetchVideos = () => dispatch => {
  dispatch(setLoading(true));
  return VideoAPIUtil.fetchVideos()
    .then(res => {
      dispatch(setLoading(false));
      dispatch(receiveVideo(res));
      dispatch(clearVideoErrors());
    })
    .fail(e => {
      dispatch(setLoading(false));
      dispatch(videoErrors(e.responseJSON));
    });
};
export const fetchUserVideos = (username) => dispatch => {
  dispatch(setLoading(true));
  return VideoAPIUtil.fetchUserVideos(username)
    .then(res => {
      dispatch(setLoading(false));
      dispatch(receiveVideos(res));
      dispatch(clearVideoErrors());
    })
    .fail(e => {
      dispatch(setLoading(false));
      dispatch(videoErrors(e.responseJSON));
    });
};
export const fetchVideo = (id) => dispatch => {
  dispatch(setLoading(true));
  return VideoAPIUtil.fetchVideos(id)
    .then(res => {
      dispatch(setLoading(false));
      dispatch(receiveVideos(res));
      dispatch(clearVideoErrors());
    })
    .fail(e => {
      dispatch(setLoading(false));
      dispatch(videoErrors(e.responseJSON));
    });
};
export const createVideo = (video) => dispatch => {
  dispatch(setLoading(true));
  return VideoAPIUtil.createVideo(video)
    .then(res => {
      dispatch(setLoading(false));
      dispatch(receiveVideo(res));
      dispatch(clearVideoErrors());
      dispatch(fetchUser(res.username));
    })
    .fail(e => {
      dispatch(setLoading(false));
      dispatch(videoErrors(e.responseJSON));
    });
};

export const receiveVideo = (video) => ({
  type: RECEIVE_VIDEO,
  video
});
export const receiveVideos = (videos) => ({
  type: RECEIVE_VIDEOS,
  videos
});
export const videoErrors = (errors) => ({
  type: VIDEO_ERRORS,
  errors
});
export const clearVideoErrors = () => ({
  type: VIDEO_ERRORS,
  errors: {}
});