@users.each do |user|
  json.set! user.username do
    json.partial! user
  end
end