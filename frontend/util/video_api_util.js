export const createVideo = (video) => $.ajax({
  url: `/api/videos`,
  method: "POST",
  data: video,
  processData: false,
  contentType: false
});
export const fetchVideo = (id) => $.ajax({
  url: `/api/videos/${id}`,
  method: "GET"
});

export const fetchVideos = () => $.ajax({
  url: `/api/videos`,
  method: "GET"
});
export const fetchUserVideos = (username) => $.ajax({
  url: `/api/users/${username}/videos`,
  method: "GET"
});