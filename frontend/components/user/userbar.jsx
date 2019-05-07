import React from "react";
import {NavLink, Link} from "react-router-dom";

export default props=>(
  <nav className="userbar">
    <NavLink exact to={`/${props.user.username}`}>
      <img src={props.user.avatar} />
      {props.user.username}
    </NavLink>
    <NavLink exact to={`/${props.user.username}/videos`}>
      Videos
    </NavLink>
    {props.user.username === props.currentUser ? <Link to='/videos/upload'>Upload</Link> : ""}
  </nav>
);