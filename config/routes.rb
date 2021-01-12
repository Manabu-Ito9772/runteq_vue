Rails.application.routes.draw do
  root to: 'home#index'
  get '*path', to: 'home#index'
  get 'tasks', to: 'home#index'
end
