json.extract! video, :id, :title, :description
json.createdAt video.created_at
json.username video.user.username
if video.thumbnail.attached?
  json.thumbnail url_for(video.thumbnail)
end
if video.source.attached?
  json.source url_for(video.source)
end