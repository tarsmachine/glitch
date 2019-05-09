import React from "react";

export default props=>(<>
  {props.user.description ? 
  <div className="user-description">
    <span className="description">{props.user.description}</span>
  </div> : ""}
  </>
);