class Api::VideosController < ApplicationController

  def index
    if(params[:user_id])
      @videos = Video.with_attached_thumbnail.find_by(user_id: params[:user_id])
    else
      @videos = Video.with_attached_thumbnail.all
    end
  end

  def create
    if(logged_in?)
      @video = Video.new(video_params)
      @video.user_id = current_user.id
      if @video.save
        render :show
      else
        render json: @video.errors, status: 422
      end
    else
      render json: {video: "Must be logged in!"}, status: 422
    end
  end

  def show
    @video = Video.with_attached_thumbnail.with_attached_source.find_by(id: params[:id])
    if @video
      render :show
    else
      render json: {video: "Not Found"}, status: 404
    end
  end
  private
  def video_params
    params.require(:video).permit(:title, :description, :thumbnail, :source)
  end
end
