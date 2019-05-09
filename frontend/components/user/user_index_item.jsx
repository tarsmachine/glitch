import React from "react";
import {Link} from "react-router-dom";


export default (props)=>(
  <Link to={`/${props.user.username}`} className="user-index-item" >
    <img src={props.user.avatar} />
    <span className="username">{props.user.username}</span>
    <span className="description">{props.user.description ? props.user.description : props.user.username}</span>
  </Link>
);