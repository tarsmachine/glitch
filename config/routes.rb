Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :update, :show, :index] do
      resources :videos, only: [:index]
    end
    post "users/:username/follow", to: "follows#create"
    delete "users/:username/follow", to: "follows#destroy"
    resources :follows, only: [:index]
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :show, :index, :update, :destroy]
    get "search", to: "search#show"
    get "search/users", to: "search#users"
    get "search/videos", to: "search#videos"
    get "search/top_videos", to: "search#top_videos"
    get ":username/search/top_videos", to: "search#top_videos"
    get "search/latest_videos", to: "search#latest_videos"
    get ":username/search/latest_videos", to: "search#latest_videos"
  end
  match "*path", to: 'static_pages#root', via: :all, constraints: lambda { |req| req.format == :html }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
