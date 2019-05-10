export const fetchFollows = () => $.ajax({
  url: "/api/follows",
  method: "GET",
});
export const createFollow = (username) => $.ajax({
  url: `/api/users/${username}/follow`,
  method: "POST"
});
export const deleteFollow = (username) => $.ajax({
  url: `/api/users/${username}/follow`,
  method: "DELETE"
});