export const fetchUser = username => $.ajax({
  url: `/api/users/${username}`,
  method: "GET"
});

export const updateUser = (user) => $.ajax({
  url: `/api/users/${user.id}`,
  method: "PATCH",
  data: { user }
});
export const updateUserAvatar = (id, avatar) => $.ajax({
  url: `/api/users/${id}`,
  method: "PATCH",
  data: avatar,
  processData: false,
  contentType: false
});