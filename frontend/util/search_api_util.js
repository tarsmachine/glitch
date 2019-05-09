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
export const searchVideos = (q, offset) => $.ajax({
  url: "/api/search/users",
  method: "GET",
  data: { q, offset }
});

export const topVideos = (limit=5, offset=0) => $.ajax({
  url: "/api/search/top_videos",
  method: "GET",
  data: { limit , offset }
});

export const userTopVideos = (username, limit=5, offset=0) => $.ajax({
  url: `/api/${username}/search/top_videos`,
  method: "GET",
  data: { limit , offset }
});

export const latestVideos = (limit=5, offset=0) => $.ajax({
  url: "/api/search/latest_videos",
  method: "GET",
  data: { limit , offset }
});

export const userLatestVideos = (username, limit=5, offset=0) => $.ajax({
  url: `/api/${username}/search/latest_videos`,
  method: "GET",
  data: { limit , offset }
});

export const searchType = (q, type=false, limit=undefined, offset=0)=>{
  const url = type ? `/api/search/${type}` : "/api/search";
  return $.ajax({
    url,
    method: "GET",
    data: {q, limit, offset}
  });
};