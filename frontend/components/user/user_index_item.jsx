import React from "react";
import {Link} from "react-router-dom";
import If from "../../util/if";

export default (props)=>(
  <Link to={`/${props.user.username}`} className="user-index-item" >
    <img src={props.user.avatar} />
    <span className="username">{props.user.username}</span>
    <span className="description">
      <span className="description-username">{props.user.username}</span>
      <If 
        When={props.user.description} 
        Then={<span className="description-description">{props.user.description}</span>}
      />
    </span>
  </Link>
);