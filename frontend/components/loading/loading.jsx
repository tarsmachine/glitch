import React from "react";


export default (props)=>(
  props.loading ? 
  <div className="loading">
    <div className="glitch-lines" />
    <span className="loading-txt">Loading</span>
  </div> : ""
);