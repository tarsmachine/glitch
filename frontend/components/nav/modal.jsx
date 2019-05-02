import React from 'react';
import LogoIcon from "./logo_icon";
import ReactModal from "react-modal";
import merge from "lodash/merge";

class Modal extends React.Component{
  constructor(props){
    ReactModal.setAppElement("#root");
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state={
      user: {username: "", password: "", email: ""},
      showPassword: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }
  handleCloseModal(){
    this.props.showModal(false)();
  }
  handleInput(type){
    return (e)=>{
      e.preventDefault();
      const user = merge({}, this.state.user, {[type]: e.target.value });
      this.setState({user});
    };
  }
  handleSubmit(e){
    e.preventDefault();
    if(this.props.type.toLowerCase() === "login"){
      this.props.login(this.state.user).then(()=>this.handleCloseModal());
    }else{
      this.props.signup(this.state.user).then(()=>this.handleCloseModal());
    }
  }
  demoLogin(e){
    e.preventDefault();
    this.props.login({username: "demo_user", password: "demo1234"}).then(()=>this.handleCloseModal());
  }
  togglePasswordVisibility(){
    return (e)=>{
      e.preventDefault();
      this.setState({showPassword: !this.state.showPassword});
    };
  }
  render(){
    if(!this.props.type) return null;
    const signup = this.props.type.toLowerCase() === "signup";
    const login = this.props.type.toLowerCase() === "login";
    const loginDisabled = login ? 
    (this.state.user.username === "" || this.state.user.password === "") 
    : (this.state.user.username === "" || this.state.user.email === "" || this.state.user.password === "");
    return (
      <ReactModal 
        isOpen={Boolean(this.props.type)} 
        onRequestClose={this.handleCloseModal}
        shouldCloseOnOverlayClick={true}
        className="auth-modal"
        overlayClassName="auth-overlay"
        >
        <h1>
          <LogoIcon className="modal-icon"/>
        { login ? "Log in to Glitch" : "Join Glitch today"}</h1>
        <nav className="modal-nav">
          <button onClick={this.props.showModal("login")} className={ login ? "active": ""}>Log In</button>
          <button onClick={this.props.showModal("signup")} className={ signup ? "active" : ""}>Sign Up</button>
        </nav>
        { (this.props.errors.length > 0 ) ?
          <div className="errors">
            <i className="fas fa-minus-circle"></i>
            <ul>
              {this.props.errors.map((err, idx)=><li key={idx}>{err}</li>)}
            </ul>
          </div>
          : ""
        }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={this.state.username} onChange={this.handleInput("username")}/>
          { signup ? 
          (<>
            <label htmlFor="email">Email</label>
              <input type="text" id="email" value={this.state.email} onChange={this.handleInput("email")}/>
          </>) : ""}
          <label htmlFor="password">Password</label>
          <span>
            <input type={this.state.showPassword ? "text" : "password"} id="password" value={this.state.password} onChange={this.handleInput("password")}/>
            <i onClick={this.togglePasswordVisibility()} className="fas fa-eye" />
          </span>
          <button disabled={loginDisabled}>{login ? "Log In" : "Sign Up"}</button>
          {login ? <button onClick={this.demoLogin}>Demo Login</button> : "" }
        </form>
        <button onClick={this.handleCloseModal} className="close">X</button>
      </ReactModal>
    );
  }
}
export default Modal;