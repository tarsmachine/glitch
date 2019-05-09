import React from "react";
import {Link} from "react-router-dom";

export default props=>(
  <Link className="video-index-item" to={`/${props.video.username}/videos/${props.video.id}`}>
    <img src={props.video.thumbnail}/>
    <span className="video-index-title">{props.video.title}</span>
    <span className="video-index-username">{props.video.username}</span>
    <span className="video-index-description">{props.video.description ? props.video.description : props.video.title}</span>
  </Link>
);