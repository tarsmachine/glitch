import React from "react";

class Settings extends React.Component{
  constructor(props){
    super(props);
    this.state = {email: currentUser.email, description: currentUser.description};
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
  }

  render(){
    return null;
  }
}
export default Settings;