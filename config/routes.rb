Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :update, :show, :index] do
      resources :videos, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :videos, only: [:create, :show, :index]
    get "search", to: "search#show"
    get "search/users", to: "search#users"
    get "search/videos", to: "search#videos"
  end
  p "generating routes"
  match "*path", to: 'static_pages#root', via: :all, constraints: lambda { |req| req.format == :html }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
