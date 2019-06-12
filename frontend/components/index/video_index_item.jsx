import React from "react";
import {Link} from "react-router-dom";
import If from "../../util/if";

export default props=>{
  const title = props.video.title.length <= 32 ? props.video.title : `${props.video.title.slice(0,29)}...`;
  return (
  <Link className="video-index-item" to={`/${props.video.username}/videos/${props.video.id}`}>
    <img src={props.video.thumbnail}/>
    <span className="video-index-title">{title}</span>
    <span className="video-index-username">{props.video.username}</span>
    <span className="video-index-description">
      <span className="description-title">{props.video.title}</span>
      <If 
        When={props.video.description}
        Then={<span className="description-description">{props.video.description}</span>}
      />
    </span>
  </Link>
  );
};