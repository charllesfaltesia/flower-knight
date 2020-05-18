Rails.application.routes.draw do
  root "flowers#index"
  resources :flowers, only: [:index, :show]
end