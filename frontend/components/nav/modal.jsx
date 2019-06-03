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
      this.props.login(this.state.user).then(()=>{
        this.handleCloseModal(); 
        // this.props.history.push("/");
      });
    }else{
      this.props.signup(this.state.user).then(()=>{
        this.handleCloseModal(); 
        // this.props.history.push("/");
      });
    }
  }
  demoLogin(e){
    e.preventDefault();
    this.props.login({username: "demo_user", password: "demo1234"}).then(()=>{
      this.handleCloseModal(); 
      //this.props.history.push("/");
    });
  }
  togglePasswordVisibility(){
    return (e)=>{
      e.preventDefault();
      this.setState({showPassword: !this.state.showPassword});
    };
  }
  componentDidUpdate(oldProps){
    if(oldProps.type !== this.props.type){
      this.setState({user:{username: "", email: "", password: ""}});
    }
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
        {(login && Object.values(this.props.errors).length > 0) ?
          <div className="errors">
            <i className="fas fa-minus-circle"></i>
            <ul>
              {Object.values(this.props.errors).map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
          : ""
        }
        <nav className="modal-nav">
          <button onClick={this.props.showModal("login")} className={ login ? "active": ""}>Log In</button>
          <button onClick={this.props.showModal("signup")} className={ signup ? "active" : ""}>Sign Up</button>
        </nav>
        
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username 
              {this.props.errors.username ? <i className="mini-error-icon fas fa-minus-circle" /> : ""}
            </label>
            <input type="text" id="username" value={this.state.user.username} onChange={this.handleInput("username")}
              className={this.props.errors.username ? "input-error" : ""}
              />
            {signup ? <div className="subtext">
              {this.props.errors.username? `*Username ${this.props.errors.username}` : "This is the name people will know you by on Glitch."}
            </div> : ""}
          </div>
          { signup ? 
          (<div>
            <label htmlFor="email">Email
              {this.props.errors.email  ? <i className="mini-error-icon fas fa-minus-circle" /> : ""}
            </label>
              <input type="text" id="email" value={this.state.user.email} onChange={this.handleInput("email")}
                className={this.props.errors.email ? "input-error" : ""}
              />
              { signup ? <div className="subtext">
                {this.props.errors.email ? `*Email ${this.props.errors.email}` : "This is your email address."}
              </div> : ""}
          </div>) : ""}
          <div>
            <label htmlFor="password">Password
              {this.props.errors.password ? <i className="mini-error-icon fas fa-minus-circle" /> : ""}
            </label>
            <span>
              <input type={this.state.showPassword ? "text" : "password"} id="password" value={this.state.user.password} onChange={this.handleInput("password")}
                className={this.props.errors.password ? "input-error" : ""}
              />
              <i onClick={this.togglePasswordVisibility()} className="fas fa-eye" />
              { signup ? <div className="subtext">
                {this.props.errors.password ? `*Password ${this.props.errors.password}` : "Please make your password at least 8 characters."}
              </div> : "" }
            </span>
          </div>
          <button disabled={loginDisabled}>{login ? "Log In" : "Sign Up"}</button>
          {login ? <button onClick={this.demoLogin}>Demo Login</button> : "" }
        </form>
        <button onClick={this.handleCloseModal} className="close">X</button>
      </ReactModal>
    );
  }
}
export default Modal;