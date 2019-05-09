json.set! :videos do
  @videos.each do |video|
    json.set! video.id do
      json.partial! video
    end
  end
end
json.set! :count do
  json.set! :videos, @video_count
end