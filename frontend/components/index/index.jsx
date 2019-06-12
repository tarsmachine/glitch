import React from "react";
import VideoIndexItem from "./video_index_item";
import If from "../../util/if";
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
      <ul className="video-index latest-videos">
        <If 
          When={this.props.latestVideos.length === 0} 
          Then={<li className="no-videos">No Videos</li>}
          Else={this.props.latestVideos.map(video=><li key={video.id}><VideoIndexItem video={video} /></li>)}
        />
      </ul>
      </>
    )
  }
  topVideos(){
    return(
       <>
      <h2>Top Videos</h2>
      <ul className="video-index top-videos">
        <If 
          When={this.props.topVideos.length == 0}
          Then={<li className="no-videos">No Videos</li>}
          Else={this.props.topVideos.map(video=><li key={video.id}><VideoIndexItem video={video} /></li>)}
        />
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