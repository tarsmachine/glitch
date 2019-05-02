class Api::UsersController < ApplicationController
  def create
    if params[:user]
      @user = User.new(new_user_params)
      if @user.save
        login @user
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["Invalid request"], status: 422
    end
  end
  def update
    @user = current_user
    if @user.update(update_user_params)
    #Handle thumbnail/active storage?
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  def show
    @user = User.find_by(params[:id])
    if @user
      render :show
    else
      render json: ["User not found"], status: 422
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
    return params.requre(:user).permit(:description) if(params[:user] && params[:user][:username] == "demo_user")
    params.requre(:user).permit(:password, :email, :description)
  end
end
