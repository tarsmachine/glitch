import React from "react";
import If from "../../util/if";

export default props=>(
  <If
    When={props.user.description} 
    Then={
      <div className="user-description">
        <span className="description">{props.user.description}</span>
      </div>
    }
  />
);