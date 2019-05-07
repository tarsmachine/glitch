import * as SearchAPIUtil from "../util/search_api_util";
import {receiveUsers} from "./session_actions";

export const SEARCH_RESULTS = "SEARCH_RESULTS";
export const CLEAR_RESULTS = "CLEAR_RESULTS";
export const SHOW_SEARCH = "SHOW_SEARCH";
export const SEARCH_OFFSET = "SEARCH_OFFSET";
export const SEARCH_ERRORS = "SEARCH_ERRORS";

export const search = query => dispatch => SearchAPIUtil.search(query)
.then(res=>{
  dispatch(searchResults(res));
  dispatch(receiveUsers(res.users));
  dispatch(clearSearchErrors());
}).fail(err=>dispatch(searchErrors(err.responseJSON)));

export const searchUsers = (query, offset=0) => dispatch => SearchAPIUtil.searchUsers(query, offset)
.then(res=>{
  dispatch(searchResults(res)); 
  dispatch(receiveUsers(res.users));
  dispatch(clearSearchErrors());
}).fail(err=>dispatch(searchErrors(err.responseJSON)));

export const searchType = (query, type, limit, offset) => dispatch => SearchAPIUtil.searchType(query, type, limit, offset)
.then((res)=>{
  dispatch(searchResults(res));
  if(res.users){
    dispatch(receiveUsers(res.users));
  }
  dispatch(clearSearchErrors());
}).fail(err=>dispatch(searchErrors(err.responseJSON)));

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