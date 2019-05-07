import { search } from "../util/search_api_util";

export const LOADING = "LOADING";
export const setLoading = (value)=>({
  type: LOADING,
  value
});