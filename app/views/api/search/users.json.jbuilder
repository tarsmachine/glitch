json.set! :users do
  @users.each do |user|
    json.set! user.id do
      json.partial! user
    end
  end
end
json.set! :count do
  json.set! :users, @user_count
end