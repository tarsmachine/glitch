import React from "react";
import {NavLink, Link} from "react-router-dom";
import FollowButtonContainer from "./follow_button_container";
import If from "../../util/if";

export default props=>(
  <nav className="userbar">
    <NavLink exact to={`/${props.user.username}`}>
      <img src={props.user.avatar} />
      {props.user.username}
    </NavLink>
    <NavLink exact to={`/${props.user.username}/videos`}>
      Videos
    </NavLink>
    <If When={props.currentUser && props.user.username === props.currentUser.username} Then={<Link to='/videos/upload'>Upload</Link>}/>
    <div className="spacer"/>
    <If When={props.currentUser} Then={()=><FollowButtonContainer username={props.user.username} currentUser={props.currentUser} />}/>
  </nav>
);