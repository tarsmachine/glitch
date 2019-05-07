export const search = (q) => $.ajax({
  url: "/api/search",
  method: "GET",
  data: { q }
});
export const searchUsers = (q, offset) => $.ajax({
  url: "/api/search/users",
  method: "GET",
  data: { q, offset }
});

export const searchType = (q, type=false, limit=undefined, offset=0)=>{
  const url = type ? `/api/search/${type}` : "/api/search";
  return $.ajax({
    url,
    method: "GET",
    data: {q, limit, offset}
  });
};