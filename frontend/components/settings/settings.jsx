import React from "react";
import merge from "lodash/merge";

class Settings extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props);
    console.log("hi");
    const user = merge({}, this.props.currentUser);
    user.description = user.description || "";
    this.state = user;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render(){
    return (
      <section className="settings">
      <h1>Settings</h1>
      <ul>
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