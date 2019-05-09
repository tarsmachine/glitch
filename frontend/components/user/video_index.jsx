import React from "react";
import VideoIndexItem from "./video_index_item";
class VideoIndex extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchVideos();
  }
  componentDidUpdate(oldProps){
    if(oldProps.match.params.username != this.props.match.params.username) this.props.fetchVideos();
  }
  render(){
    return (
    <div className="index">
      <h1>All Videos</h1>
      <ul className={`video-index ${this.props.loading ? "hidden" : ""}`}>
          {this.props.videos.length === 0 ? <li className="no-videos">No Videos</li> : ""}
          {this.props.videos.map(video => <li key={video.id}><VideoIndexItem video={video} /></li>)}
      </ul>
    </div>);
  }
}
export default VideoIndex;