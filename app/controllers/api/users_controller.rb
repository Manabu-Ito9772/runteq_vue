class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate!, only: %i[me]

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors, status: :bad_request
    end
  end

  def me
    render json: current_user, methods: [:avatar_url]
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :name, :avatar)
  end
end
