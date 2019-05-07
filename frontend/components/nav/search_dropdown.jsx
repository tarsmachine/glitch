import React from "react";

class SearchDropdown extends React.Component{
  constructor(props){
    super(props);
    this.redirect = this.redirect.bind(this);
  }
  title(){
    let text = "";
    switch(this.props.category){
      case "users":
        text = "Channels";
        break;
      default:
        text = "Top Results";
        break;
    }
    return (<span>
              <i className={`fas fa-chevron-left ${this.props.category ? "search-back" : "hidden"}`}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.props.setCategory(false);
                }} />
                {text}
            </span>);
  }
  redirect(url){
    return (e)=>{
      e.preventDefault();
      this.props.history.push(url);
      this.props.showSearch(false);
    };
  }
  
  userIndex(){
    let users = Object.values(this.props.results.users);
    if(!this.props.category) users=users.slice(0,5);
    return (
      <>
        <span className={`list-title ${this.props.category ? "hidden" : ""}`} onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          this.props.setCategory("users");
        }
        }>
          <span>Channels</span>
        </span>
        <ul>
          {users.map((user)=>(
            <li className="search-user" key={user.id} onClick={this.redirect(`/${user.username}`)}>
              <img src={user.avatar} />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }
  noResults(){
    let noResults=true;
    Object.values(this.props.results.count).forEach(count=>{if(count > 0) noResults=false});
    return noResults? <ul>
      <li className="no-results">
        No Results
      </li>
    </ul>  : "";
  }
  render(){
    return (
      <div className="search-dropdown">
        <span className="search-title">{this.title()}</span>
        {this.props.results.users ? this.userIndex() : ""}
        {this.noResults()}
      </div>
    );
  }
}


export default SearchDropdown;