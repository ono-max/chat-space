Rails.application.routes.draw do
  get 'messages/index'

  get 'welcome/index'
  root "messages#index"
end
