export const createVideo = (video) => $.ajax({
  url: `/api/videos`,
  method: "POST",
  data: video,
  processData: false,
  contentType: false
});
export const editVideo = (video) => $.ajax({
  url: `/api/videos/${video.id}`,
  method: "PATCH",
  data: video,
  processData: false,
  contentType: false
});
export const deleteVideo = (videoId) => $.ajax({
  url: `/api/videos/${videoId}`,
  method: "DELETE"
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