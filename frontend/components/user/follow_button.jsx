import React from "react";
class FollowButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {submitting: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    e.preventDefault();
    if(this.state.submitting) return;
    this.setState({submitting: true}, 
      ()=>this.props.handleFollow(()=>this.setState({submitting: false}))
    );
  }

  render(){
    return (<button disabled={this.state.submitting} className="follow-button" onClick={this.handleClick}><i className="fas fa-heart"/>{this.props.text}</button>);
  }
}


export default FollowButton;