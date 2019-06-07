import React from "react";
import {Link} from "react-router-dom";

export default props=>{
  const title = props.video.title.length <= 32 ? props.video.title : `${props.video.title.slice(0,29)}...`;
  return (
  <Link className="video-index-item" to={`/${props.video.username}/videos/${props.video.id}`}>
    <img src={props.video.thumbnail}/>
    <span className="video-index-title">{title}</span>
    <span className="video-index-username">{props.video.username}</span>
    <span className="video-index-description">{props.video.description ? props.video.description : props.video.title}</span>
  </Link>
  );
};