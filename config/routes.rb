Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api, format: 'json' do
    resources :tasks
  end
  get '*path', to: 'home#index'
end
