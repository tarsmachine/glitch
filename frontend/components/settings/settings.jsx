import React from "react";
import merge from "lodash/merge";

class Settings extends React.Component{
  constructor(props){
    super(props);
    const user = merge({}, this.props.currentUser);
    user.description = user.description || "";
    this.state = user;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.avatarSubmit = this.avatarSubmit.bind(this);
  }
  handleInput(type){
    return (e)=>{
      e.preventDefault();
      this.setState({[type]: e.target.value});
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state).then(()=>this.props.history.push("/"));
  }
  avatarSubmit(e){
    e.preventDefault();
    const avatar = document.querySelector("#avatar").files[0];
    const fd = new FormData();
    fd.append("user[avatar]", avatar);
    if(avatar){
      this.props.setLoading(true);
      this.props.updateUserAvatar(this.props.currentUser.id, fd).then(()=>this.props.setLoading(false), ()=>this.props.setLoading(false));
    }
  }
  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){
    return (
      <section className="settings">
        <h1>Settings</h1>
        <ul>
          <li>
            <h2>Avatar</h2>
            <form className="avatar-form" onSubmit={this.avatarSubmit}>
              <span>Current</span>
              <img src={this.props.currentUser.avatar}/>  
              <div className="selector">
                <input type="file" onChange={this.avatarSubmit} id="avatar" name="user[avatar]" accept=".png, .jpeg, .jpg, .gif, .svg" />
                <label htmlFor="avatar">Select an Image</label>
                {this.props.errors.avatar ? <span className="errors">{`File: ${this.props.errors.avatar}`}</span> : ""}
                <span className="subtext">Please choose an image file under 500kb (.png, .jpg, .gif, .svg)</span>
              </div>
            </form>
          </li>
          <li>
            <h2>Profile Settings</h2>
            <form className="settings-form" onSubmit={this.handleSubmit}>
              <ul>
                <li>
                  <label htmlFor="description">Description</label>
                  <div>
                    <textarea id="description" value={this.state.description} onChange={this.handleInput("description")}/>
                    <span>Who you are in fewer than 300 characters</span>
                  </div>
                </li>
              </ul>
              <button>Save Changes</button>
            </form>
          </li>
        </ul>
      </section>
    );
  }
}
export default Settings;