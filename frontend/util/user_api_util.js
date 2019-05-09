export const fetchUser = username => $.ajax({
  url: `/api/users/${username}`,
  method: "GET"
});
export const fetchUsers = (limit = 100, offset = 0)=>$.ajax({
  url: '/api/users',
  method: "GET",
  data: {limit, offset}
});

export const updateUser = (user) => $.ajax({
  url: `/api/users/${user.username}`,
  method: "PATCH",
  data: { user }
});
export const updateUserAvatar = (username, avatar) => $.ajax({
  url: `/api/users/${username}`,
  method: "PATCH",
  data: avatar,
  processData: false,
  contentType: false
});