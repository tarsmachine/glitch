class Api::SearchController < ApplicationController
  def show
    #all types
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 5 : 5
    if(params[:q])
      @users = User.with_attached_avatar.where("username LIKE ?", "%#{User.sanitize_sql_like(params[:q])}%").limit(limit).offset(offset).order(id: "ASC")
      @user_count = User.where("username LIKE ?", "%#{User.sanitize_sql_like(params[:q])}%").count
      @videos = Video.with_attached_thumbnail.with_attached_source.includes(:user).where("title LIKE ?", "%#{Video.sanitize_sql_like(params[:q])}%").limit(limit).offset(offset).order(id: "ASC")
      @video_count = Video.where("title LIKE ?", "%#{Video.sanitize_sql_like(params[:q])}%").count
      render :show
    else
      render json: {query: "Invalid Query"}, status: 422
    end
  end
  def users
    #just users
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 100 : 100
    if(params[:q])
      @users = User.with_attached_avatar.where("username LIKE ?", "%#{User.sanitize_sql_like(params[:q])}%").limit(limit).offset(offset).order(id: "ASC")
      @user_count = User.where("username LIKE ?", "%#{User.sanitize_sql_like(params[:q])}%").count
      render :users
    else
      render json: {query: "Invalid Query"}, status: 422
    end
  end
  def videos
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 100 : 100
    if(params[:q])
      @videos = Video.with_attached_thumbnail.with_attached_source.includes(:user).where("title LIKE ?", "%#{Video.sanitize_sql_like(params[:q])}%").limit(limit).offset(offset).order(id: "ASC")
      @video_count = Video.where("title LIKE ?", "%#{Video.sanitize_sql_like(params[:q])}%").count
      render :videos
    else
      render json: {query: "Invalid Query"}, status: 422
    end
  end
  def top_videos
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 5 : 5
    @videos = Video.with_attached_source.with_attached_thumbnail.all.limit(limit).offset(offset).order(updated_at: :desc)
    if(params[:username])
      @videos = @videos.includes(:user).where(users: {username: params[:username]})
    end
    render :videos
  end
  def latest_videos
    offset = params[:offset] ? params[:offset].to_i || 0 : 0
    limit = params[:limit] ? params[:limit].to_i || 5 : 5
    @videos = Video.with_attached_source.with_attached_thumbnail.all.limit(limit).offset(offset).order(created_at: :desc)
    if(params[:username])
      @videos = @videos.includes(:user).where(users: {username: params[:username]})
    end
    render :videos
  end
end
