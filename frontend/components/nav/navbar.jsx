import React from 'react';
import Modal from "./modal";
import ProfileButton from "./profile_button";
import {Redirect, Link, NavLink} from "react-router-dom";
import SearchBar from "./search_bar";
import Logo from "./logo";

class Navbar extends React.Component{
  constructor(props){
    super(props);
    let modal = false;
    console.log(this.props.location.hash.toLowerCase());
    if (this.props.location.pathname.toLowerCase() === "/login" ) modal="login";
    if (this.props.location.pathname.toLowerCase() === "/signup") modal="signup";
    this.state = { modal };
    this.showModal = this.showModal.bind(this);
  }
  showModal(type){
    return ()=>{
      this.props.clearErrors();
      this.setState({modal: type});
    };
  }
  redirect(){
    if(this.props.location.hash.toLowerCase() === "#/signup") this.showModal("signup")();
    if(this.props.location.hash.toLowerCase() === "#/login") this.showModal("login")();
    return this.props.location.hash ? <Redirect to={this.props.location.hash.slice(1)} /> : "";
  }
  render(){
    return (
      <nav className="navbar">
        {this.redirect()}
        <Logo />
        <NavLink exact to="/" >Discover</NavLink>
        {this.props.loggedIn ? <NavLink to="/following" >Following</NavLink> : ""}
        <NavLink to="/directory" >Browse</NavLink>
        <SearchBar />
        {this.props.loggedIn ? <button className="logout-btn" onClick={this.props.logout}>Log Out</button> : <button className="login-btn" onClick={this.showModal("login")}>Log In</button>}
        {this.props.loggedIn ? "" : <button className="signup-btn" onClick={this.showModal("signup")}>Sign Up</button>}
        <ProfileButton 
          loggedIn={this.props.loggedIn} 
          currentUser={this.props.currentUser} 
          showModal={this.showModal} 
          logout={this.props.logout}
        />
        {this.props.loggedIn ? "" : 
        <Modal showModal={this.showModal} type={this.state.modal} 
        login={this.props.login} signup={this.props.signup} errors={this.props.errors}
        />}
      </nav>
    );
  }
}

export default Navbar;