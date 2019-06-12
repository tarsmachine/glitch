import React from 'react';
import Modal from "./modal";
import ProfileButton from "./profile_button";
import {Redirect, Link, NavLink} from "react-router-dom";
import SearchBarContainer from "./search_bar_container";
import Logo from "./logo";
import If from "../../util/if";

class Navbar extends React.Component{
  constructor(props){
    super(props);
    let modal = false;
    if (this.props.location.pathname.toLowerCase() === "/login" ) modal="login";
    if (this.props.location.pathname.toLowerCase() === "/signup") modal="signup";
    if (this.props.loggedIn) modal=false;
    this.state = { modal };
    this.showModal = this.showModal.bind(this);
  }
  showModal(type){
    return ()=>{
      this.props.clearErrors();
      this.setState({modal: type});
    };
  }
  render(){
    return (
      <nav className="navbar">
        <Logo />
        <NavLink exact to="/" >Discover</NavLink>
        {this.props.loggedIn ? <NavLink to="/following" >Following</NavLink> : ""}
        <NavLink to="/directory" >Browse</NavLink>
        <SearchBarContainer />
        <span className="spacer"/>
        <If 
          When={this.props.loggedIn} 
          Then={
            <button className="logout-btn" onClick={this.props.logout}>Log Out</button> 
          } 
          Else={
            <button className="login-btn" onClick={this.showModal("login")}>Log In</button>
          }
        />
        <If
          When={!this.props.loggedIn}
          Then={
            <button className="signup-btn" onClick={this.showModal("signup")}>
              Sign Up
            </button>
          }
        />
        <ProfileButton 
          loggedIn={this.props.loggedIn} 
          currentUser={this.props.currentUser} 
          showModal={this.showModal} 
          logout={this.props.logout}
        />
        <If 
          When={!this.props.loggedIn}
          Then={
            <Modal 
              showModal={this.showModal} type={this.state.modal} history={this.props.history}
              login={this.props.login} signup={this.props.signup} errors={this.props.errors}
            />
          }
        />
      </nav>
    );
  }
}

export default Navbar;