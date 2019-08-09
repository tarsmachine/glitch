class Api::UsersController < ApplicationController
  def index
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 100 : 100
    @users = User.with_attached_avatar.all.limit(limit).offset(offset)
    render :index
  end
  def create
    if params[:user]
      @user = User.new(new_user_params)
      if @user.save
        login @user
        render :show
      else
        render json: @user.errors, status: 422
      end
    else
      render json: {user: 'Invalid request'}, status: 422
    end
  end
  def update
    @user = User.with_attached_avatar.find_by(username: params[:id])
    if(@user != current_user)
      render json: {user: "You cannot edit other users!"}, status: 422
    elsif @user.update(update_user_params)
      render :show
    else
      render json: @user.errors, status: 422
    end
  end
  def show
    @user = User.with_attached_avatar.find_by(username: params[:id])
    if @user
      render :show
    else
      render json: {user: 'User not found'}, status: 404
    end
  end
  
  private
  def new_user_params
    params.require(:user).permit(:username, :password, :email)
  end
  def update_user_params
    #Don't allow demo user to change credentials!!!
    return params.require(:user).permit(:description) if(params[:user] && params[:user][:username] == "demo_user")
    params.require(:user).permit(:password, :email, :description, :avatar)
  end
end
