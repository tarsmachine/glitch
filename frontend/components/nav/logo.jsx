
import {Link} from "react-router-dom";
import React from "react";
import LogoIcon from "./logo_icon";
export default ()=>(
  <Link className="logo" to="/">
    <LogoIcon className="baselogo" />
    <LogoIcon className="baselogo" />
    <LogoIcon className="baselogo" />
  </Link>
);