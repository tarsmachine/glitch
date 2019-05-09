import React from "react";
import {withRouter} from "react-router-dom";

class ProfileDropdown extends React.Component{
  constructor(props){
    super(props);
    this.node = React.createRef();
    this.userDropdown = this.userDropdown.bind(this);
    this.loginDropdown = this.loginDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }
  hideDropdown(e){
    if (!this.node.current.contains(e.target)) {
      this.props.hideDropdown(); //callback to parent to hide this component
    }
  }
  componentDidMount(){
    document.addEventListener("click", this.hideDropdown);
  }
  componentWillUnmount(){
    document.removeEventListener("click", this.hideDropdown);
  }
  redirect(url){
    return (e)=>{
      e.preventDefault();
      this.props.hideDropdown(); //hide the dropdown before changing the page
      this.props.history.push(url);
    };
  }
  userDropdown(){
    return (<>
              <li className="no-hover bold">
                <img src={this.props.currentUser.avatar} onClick={this.redirect("/settings")}/>
                {this.props.currentUser.username}
              </li>
              <li className="no-hover new-section"/>
              <li onClick={this.redirect(`/${this.props.currentUser.username}`)}><i className="fas fa-user-circle" />Your Channel</li>
              <li onClick={this.redirect("/videos/upload")}><i className="fas fa-upload" />Upload Video</li>
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