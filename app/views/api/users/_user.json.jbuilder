json.extract! user, :username, :email, :description, :id
if user.avatar.attached?
  json.avatar url_for(user.avatar)
else
  json.avatar image_url("creepy-ghost.svg")
end
json.videos do
  json.array! user.video_ids
end
json.set! :follows, user.follows.map{ |follow| follow.username }