import React from "react";
import VideoIndexItem from "./video_index_item";

class Index extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchLatestVideos();
    this.props.fetchTopVideos();
  }
  componentDidUpdate(oldProps){
    if(this.props.location.pathname !== oldProps.location.pathname) this.props.fetchLatestVideos();
    if(this.props.location.pathname !== oldProps.location.pathname) this.props.fetchTopVideos();
  }
  latestVideos(){
    return(
      <>
      <h2>Latest Videos</h2>
      <ul className="video-index-list latest-videos">
        {this.props.latestVideos.length == 0 ? <li className="no-videos">No Videos</li> : ""}
        {this.props.latestVideos.map(video=><li key={video.id}><VideoIndexItem video={video} /></li>)}
      </ul>
      </>
    )
  }
  topVideos(){
    return(
       <>
      <h2>Top Videos</h2>
      <ul className="video-index-list top-videos">
          {this.props.topVideos.length == 0 ? <li className="no-videos">No Videos</li> : ""}
        {this.props.topVideos.map(video=><li key={video.id}><VideoIndexItem video={video} /></li>)}
      </ul>
      </>
    )
  }
  render(){
    return (
      <div className={`index-container ${this.props.loading ? "hidden" : ""}`}>
        {this.latestVideos()}
        {this.topVideos()}
      </div>
    );
  }
}
export default Index;