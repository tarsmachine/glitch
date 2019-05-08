json.extract! video, :id, :user_id, :title, :description
if video.thumbnail.attached?
  json.thumbnail url_for(video.thumbnail)
end
if video.source.attached?
  json.source url_for(video.source)
end