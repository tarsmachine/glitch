class Api::UsersController < ApplicationController
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
    p params
    @user = User.with_attached_avatar.find_by(id: params[:id])
    if(@user != current_user)
      render json: {user: "You cannot edit other users!"}, status: 422
    elsif @user.update(update_user_params)
    #Handle thumbnail/active storage?
      render :show
    else
      render json: @user.errors, status: 422
    end
  end
  def show
    @user = User.with_attached_avatar.find_by(params[:id])
    if @user
      render :show
    else
      render json: {user: 'User not found'}, status: 422
    end
  end
  def index
    @users = User.all
    #filtering logic, User.where(...)
    render :index
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
