class Api::SessionsController < ApplicationController
  def create
    if params[:user]
      @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
      if @user
        login @user
        render :show
      else
        render json: ["Invalid Credentials"], status: 422
      end
    else
      render json: ["Invalid request"], status: 422
    end
  end
  def destroy
    if logged_in?
      logout!
      render json: "{}"
    else
      render json: ["Not logged in"], status: 422
    end
  end
end
