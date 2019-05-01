Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :index, :update, :show]
    resource :session, only: [:create, :destroy]
  end
  match "*path", to: 'static_pages#root', via: :all
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
