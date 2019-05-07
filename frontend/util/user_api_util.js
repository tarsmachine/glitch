export const fetchUser = username => $.ajax({
  url: `/api/users/${username}`,
  method: "GET"
});