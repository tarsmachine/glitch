import * as SearchAPIUtil from "../util/search_api_util";
import {receiveUsers} from "./user_actions";
import {receiveVideos} from "./video_actions";

export const SEARCH_RESULTS = "SEARCH_RESULTS";
export const CLEAR_RESULTS = "CLEAR_RESULTS";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const SEARCH_OFFSET = "SEARCH_OFFSET";
export const SEARCH_ERRORS = "SEARCH_ERRORS";
export const TOP_VIDEOS = "TOP_VIDEOS";
export const LATEST_VIDEOS = "LATEST_VIDEOS";
export const SEARCH_LOADING = "SEARCH_LOADING";

export const search = query => dispatch => {
  dispatch(setLoading(true));
  return SearchAPIUtil.search(query)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(searchResults(res));
    dispatch(receiveUsers(res.users));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const searchUsers = (query, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.searchUsers(query, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(searchResults(res)); 
    dispatch(receiveUsers(res.users));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};
export const searchVideos = (query, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.searchVideos(query, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(searchResults(res)); 
    dispatch(receiveVideos(res.videos));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const fetchTopVideos = (limit=5, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.topVideos(limit, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(topVideos(res.videos)); 
    dispatch(receiveVideos(res.videos));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const fetchUserTopVideos = (username, limit=5, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.userTopVideos(username, limit, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(topVideos(res.videos)); 
    dispatch(receiveVideos(res.videos));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const fetchLatestVideos = (limit=5, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.latestVideos(limit, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(latestVideos(res.videos)); 
    dispatch(receiveVideos(res.videos));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const fetchUserLatestVideos = (username, limit=5, offset=0) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.userLatestVideos(username, limit, offset)
  .then(res=>{
    dispatch(setLoading(false));
    dispatch(latestVideos(res.videos)); 
    dispatch(receiveVideos(res.videos));
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const searchType = (query, type, limit, offset) => dispatch => { 
  dispatch(setLoading(true));
  return SearchAPIUtil.searchType(query, type, limit, offset)
  .then((res)=>{
    dispatch(setLoading(false));
    dispatch(searchResults(res));
    if(res.users){
      dispatch(receiveUsers(res.users));
    }
    if(res.videos){
      dispatch(receiveVideos(res.videos));
    }
    dispatch(clearSearchErrors());
  }).fail(err=>{
    dispatch(setLoading(false));
    dispatch(searchErrors(err.responseJSON));
  });
};

export const showSearch = (value) => ({
  type: SHOW_SEARCH,
  value
});
export const clearErrors = () => ({
  type: SEARCH_ERRORS,
  errors: {}
});

export const searchResults = (results) => ({
  type: SEARCH_RESULTS,
  results
});

export const topVideos = (top) => ({
  type: TOP_VIDEOS,
  top
});

export const latestVideos = (latest) => ({
  type: LATEST_VIDEOS,
  latest
});

export const searchOffset = (offset) => ({
  type: SEARCH_OFFSET,
  offset
});

export const searchErrors = (errors) => ({
  type: SEARCH_ERRORS,
  errors
});

export const clearResults = ()=>({
  type: CLEAR_RESULTS
});
export const clearSearchErrors = ()=>({
  type: SEARCH_ERRORS,
  errors: {}
});
export const setLoading = (searching)=>({
  type: SEARCH_LOADING,
  searching
});