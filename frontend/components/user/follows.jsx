import React from "react";
import UserIndexItem from "./user_index_item";

class Follows extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchFollows();
  }
  render(){
    if(this.props.follows.length == 0) return (
      <div className="directory">
        <h1>Following</h1>
        <h2>You are not following anyone!</h2>
      </div>
    )
    return (
      <div className="directory">
        <h1>Following</h1>
        <ul>
          {this.props.follows.map(follow=><li key={follow.id}><UserIndexItem user={follow} /></li>)}
        </ul>
      </div>
    );
  }
}
export default Follows;