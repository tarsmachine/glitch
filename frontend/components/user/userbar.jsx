import React from "react";
import {NavLink, Link} from "react-router-dom";
import FollowButtonContainer from "./follow_button_container";

export default props=>(
  <nav className="userbar">
    <NavLink exact to={`/${props.user.username}`}>
      <img src={props.user.avatar} />
      {props.user.username}
    </NavLink>
    <NavLink exact to={`/${props.user.username}/videos`}>
      Videos
    </NavLink>
    {props.currentUser && props.user.username === props.currentUser.username ? <Link to='/videos/upload'>Upload</Link> : ""}
    <div className="spacer"/>
    {props.currentUser ? <FollowButtonContainer username={props.user.username} currentUser={props.currentUser} /> : ""}
  </nav>
);