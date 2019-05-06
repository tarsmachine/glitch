export const login = (user) => $.ajax({
  url: "/api/session",
  method: "POST",
  data: {user}
});

export const signup = (user) => $.ajax({
  url: "/api/users",
  method: "POST",
  data: {user}
});

export const logout = () => $.ajax({
  url: "/api/session/",
  method: "DELETE",
});

export const updateUser = (user) => $.ajax({
  url: `/api/users/${user.id}`,
  method: "PATCH",
  data: {user}
});
export const updateUserAvatar = (id, avatar) => $.ajax({
  url: `/api/users/${id}`,
  method: "PATCH",
  data: avatar,
  processData: false,
  contentType: false
});