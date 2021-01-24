class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    user = User.new(user_params)

    if user.save
      render json: user
    else
      render json: user.errors, status: :bad_request
    end
  end

  def update
    avatar = params[:avatar]
    name = params[:name]
    current_user.avatar = avatar
    current_user.name = name
    if current_user.save
      render json: current_user
    else
      render json: current_user.errors, status: :bad_request
    end
  end

  def me
    render json: current_user, methods: [:avatar_url]
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
