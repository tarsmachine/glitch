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
    return (
      <div className="directory">
        <ul>
          {this.props.follows.map(follow=><li key={follow.id}><UserIndexItem user={follow} /></li>)}
        </ul>
      </div>
    );
  }
}
export default Follows;