class Api::FollowsController < ApplicationController
  def index
    @users = current_user.follows;
    render "api/users/index"
  end

  def create
    if logged_in?
      @channel = User.find_by(username: params[:username])
      @follow = Follow.new(user_id: current_user.id, channel_id: @channel.id)
      if @follow.save
        @user = User.find_by_id(current_user.id)
        render "api/users/show"
      else
        render json: @follow.errors, status: 422
      end
    else
      render json: {follow: "Must be logged in"}, status: 422
    end
  end

  def destroy
    if logged_in?
      @channel = User.find_by(username: params[:username])
      @follow = Follow.find_by(user_id: current_user.id, channel_id: @channel.id)
      if @follow.destroy
        @user = User.find_by_id(current_user.id)
        render "api/users/show"
      else
        render json: @follow.errors, status: 422
      end
    else
      render json: {follow: "Must be logged in"}, status: 422
    end
  end
end
