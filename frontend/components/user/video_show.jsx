import React from "react";
import {Link} from "react-router-dom";
import FollowButtonContainer from "./follow_button_container";

class VideoShow extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchVideo();
  }
  componentDidUpdate(oldProps){
    if (this.props.match.params.videoId !== oldProps.match.params.videoId) this.props.fetchVideo();
  }
  
  render(){
    const videoSrc = this.props.video ? this.props.video.source : "";
    const title = this.props.video ? this.props.video.title : "";
    const username = this.props.user ? this.props.user.username : "";
    const userAvatar = this.props.user ? this.props.user.avatar : "";
    const owner = (this.props.user && this.props.currentUser) ? this.props.user === this.props.currentUser : false;
    const date = this.props.video ? new Date(this.props.video.createdAt): "";
    const time = date ? `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`: "";
    return (
      <div className="user-video-show">
        <div className="top-bar">
          <Link to={`/${username}`}>
            <img className="user-avatar" src={userAvatar} />
            <span className="watching">
              Watching
              <span className="username">{username}</span>  
            </span>
          </Link>
        </div>
        <video controls autoPlay playsInline muted src={videoSrc} id="video-player" className="video-player"/>
        <div className="bottom-bar">
          {this.props.currentUser ? <FollowButtonContainer currentUser={this.props.currentUser} username={username} />
           : <span>Sign in to follow {username}</span>}
           { owner && this.props.video ? <Link to={`/${username}/videos/${this.props.video.id}/edit`}>Edit Video</Link> : "" }
        </div>
        <div className="video-info">
          <span className="title">{title}</span>
          <span className="date">{time}</span>
        </div>
      </div>
    );
  }
}

export default VideoShow;