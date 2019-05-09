import React from "react";
import UserIndexItem from "./user_index_item";
class Directory extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchUsers();
  }
  render(){
    return (
      <div className="directory">
        <ul>
          {this.props.users.map(user=><li key={user.id}><UserIndexItem user={user} /></li>)}
        </ul>
      </div>
    );
  }
}

export default Directory;