json.extract! user, :username, :email, :description, :id
if user.avatar.attached?
  json.avatar url_for(user.avatar)
else
  json.avatar image_url("creepy-ghost.svg")
end