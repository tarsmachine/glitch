import React from 'react';
import ProfileDropdown from "./profile_dropdown";
import If from "../../util/if";

class ProfileButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {showDropdown: false};
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  }
  toggleDropdown(){
    this.setState({showDropdown: !this.state.showDropdown});
  }
  hideDropdown(cb){
    this.setState({ showDropdown: false }, cb);
  }

  render(){
    return (
      <>
        <button className={`profile-btn ${this.props.loggedIn ? "img-glitch" : "i-glitch"}`} onClick={this.toggleDropdown}>
          <If 
            When={this.props.loggedIn} 
            Then={()=>
              <>
                <img src={this.props.currentUser.avatar}/>
                <img src={this.props.currentUser.avatar}/>
                <img src={this.props.currentUser.avatar}/>
              </>
            }
            Else={
              <>
                <i className="fas fa-user"/>
                <i className="fas fa-user"/>
                <i className="fas fa-user"/>
              </>
            }
          />
        </button>
        <If 
          When={this.state.showDropdown}
          Then={()=>
            <ProfileDropdown
              hideDropdown={this.hideDropdown} 
              loggedIn={this.props.loggedIn}
              showModal={(type)=>()=>this.hideDropdown(this.props.showModal(type))}
              currentUser={this.props.currentUser}
              logout={()=>{this.hideDropdown(this.props.logout);}}
            />
          }
        />
      </>
    );
  } 
}
export default ProfileButton;