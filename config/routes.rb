Rails.application.routes.draw do
  devise_for :users
  # get 'messages/index'
  # get 'welcome/index'
  root "messages#index"
  resources :users, only: [:edit, :update]
end
