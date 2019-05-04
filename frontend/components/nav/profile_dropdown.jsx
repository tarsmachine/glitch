import React from "react";
import {withRouter} from "react-router-dom";

class ProfileDropdown extends React.Component{
  constructor(props){
    super(props);
    this.node = React.createRef();
    const hideDropdown = (e)=>{
      if(this.node.current && !this.node.current.contains(e.target)){
        document.removeEventListener("click", hideDropdown);
        this.props.hideDropdown();
      }
    };
    document.addEventListener("click",hideDropdown);
    this.userDropdown = this.userDropdown.bind(this);
    this.loginDropdown = this.loginDropdown.bind(this);
  }
  redirect(url){
    return (e)=>{
      e.preventDefault();
      this.props.hideDropdown();
      this.props.history.push(url);
    };
  }
  userDropdown(){
    return (<>
              <li className="no-hover bold">{this.props.currentUser.username}</li>
              <li className="no-hover new-section"/>
              <li onClick={this.redirect("/settings")}><i className="fas fa-cog" />Settings</li>
              <li onClick={this.props.logout}><i className="fas fa-sign-out-alt" /><div>Log Out</div></li>
            </>);
  }
  loginDropdown(){
    return (<>
              <li onClick={this.props.showModal("login")}><i className="fas fa-sign-in-alt" /><div>Log In</div></li>
            </>);
  }
  render(){
    return (
      <ul className="profile-dropdown" ref={this.node}>
        {this.props.loggedIn ? this.userDropdown() : this.loginDropdown()}
      </ul>
    );
  }
}

export default withRouter(ProfileDropdown);