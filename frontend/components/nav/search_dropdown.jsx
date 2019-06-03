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
      case "videos":
        text = "Videos";
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
          <span className="all">{this.props.results.count.users}</span>
        </span>
        <ul className={this.props.loading || (this.props.category && this.props.category!=="users") ? "hidden" : ""}>
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
  videoIndex(){
    let videos = Object.values(this.props.results.videos);
    if(!this.props.category) videos=videos.slice(0,5);
    return (
      <>
        <span className={`list-title ${this.props.category ? "hidden" : ""}`} onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          this.props.setCategory("videos");
        }
        }>
          <span>Videos</span>
          <span className="all">{this.props.results.count.videos}</span>
        </span>
        <ul className={this.props.loading || (this.props.category && this.props.category !== "videos") ? "hidden" : ""}>
          {videos.map((video)=>(
            <li className="search-video" key={video.id} onClick={this.redirect(`/${video.username}/videos/${video.id}`)}>
              <img src={video.thumbnail} />
              <span>{video.title}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }
  noResults(){
    let noResults=true;
    Object.values(this.props.results.count).forEach(count=>{if(count > 0) noResults=false});
    return noResults? <ul className={this.props.loading? "hidden" : ""}>
      <li className="no-results">
        No Results
      </li>
    </ul>  : "";
  }
  loading(){
    return (
      <ul className={this.props.loading? "" : "hidden"}>
        <li className="no-results">
          Loading...
        </li>
      </ul>
    );
  }
  render(){
    return (
        <div className="search-dropdown">
        <span className="search-title">{this.title()}</span>
        {this.props.results.users ? this.userIndex() : ""}
        {this.props.results.videos ? this.videoIndex() : ""}
        {this.loading()}
        {this.noResults()}
      </div>
    );
  }
}


export default SearchDropdown;