import React from "react";
import ReactModal from "react-modal";
import {Redirect} from "react-router-dom";
import If from "../../util/if";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.video){
      this.state = {title: props.video.title, description: props.video.description, mounted: false, submitting: false};
    }else{
      this.state = {title: "", description: "", mounted: false, submitting: false};
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteVideo = this.deleteVideo.bind(this);
    this.disabled = this.disabled.bind(this);
    ReactModal.setAppElement("#root");
  }
  deleteVideo(e){
    e.preventDefault();
    if(this.state.submitting) return;
    if(!this.disabled()){
      this.setState({submitting: true},
        ()=>{
          this.props.deleteVideo(this.props.video.id).then(()=>{
            this.props.fetchUserVideos().then(()=>{
              this.props.history.push(`/`);
            });
          }, (err) => {
            this.setState({ submitting: false });
            this.props.videoErrors(err.responseJSON);
          });
        });
    }
  }
  handleInput(type) {
    return (e) => {
      e.preventDefault();
      this.setState({ [type]: e.target.value });
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.state.submitting) return;
    const fd = new FormData();
    fd.append("video[title]", this.state.title);
    fd.append("video[description]", this.state.description);
    if (document.querySelector("#thumbnail").files.length > 0){
      fd.append("video[thumbnail]", document.querySelector("#thumbnail").files[0]);
    }
    if(!this.disabled()){ //don't waste time trying to process an invalid form! front end validation
      //https://stackoverflow.com/a/22987941 for xhr events to update upload progress bar
      this.setState({ submitting: true },
        ()=>$.ajax({
          url: `/api/videos/${this.props.match.params.videoId}`,
          method: "PATCH",
          data: fd,
          processData: false,
          contentType: false,
          xhr: function () {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener("progress", function (evt) {
              if (evt.lengthComputable) {
                const progress = document.querySelector("#upload-progress");
                let percentComplete = evt.loaded / evt.total;
                percentComplete = parseInt(percentComplete * 100);
                progress.value=percentComplete;
              }
            }, false);

            return xhr;
          },
        }).then((video)=>{
          this.setState({ submitting: false });
          this.props.receiveVideo(video);
          this.props.clearErrors();
          this.props.history.push(`/${this.props.currentUser.username}/videos`);
        },(err)=>{
          this.setState({submitting: false});
          this.props.videoErrors(err.responseJSON);
        })
      );
    }
  }
  componentDidMount(){
    this.setState({mounted: this.props.video !== undefined});
    this.props.fetchVideo();
  }
  componentDidUpdate(oldProps){
    if (this.props.video !== oldProps.video) this.setState({title: this.props.video.title, description: this.props.video.description, mounted: true});
  }
  componentWillUnmount() {
    this.props.clearErrors();
  }
  disabled(){
    if(!this.state.mounted) return true;
    if(this.props.loading) return true;
    if(this.state.submitting) return true;
    return !(this.state.title && !this.props.loading);
  }

  render() {
    if(this.props.video && this.props.video.username!==this.props.currentUser.username) return (<Redirect to="/" />);
    return (
      <section className="edit-video">
        <h1>Edit Video</h1>
          <form className="video-form" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Title </label>
              <input type="text" id="title" value={this.state.title} onChange={this.handleInput("title")} />
            </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" value={this.state.description} onChange={this.handleInput("description")} />
          </div>
          <div>
            <div className="selector">      
              <input type="file" id="thumbnail" name="video[thumbnail]" onChange={this.handleInput("thumbnail")} accept=".png, .jpeg, .jpg, .gif, .svg" />
              <label htmlFor="thumbnail">Select Thumbnail Image</label>
              <If 
                When={this.state.thumbnail} 
                Then={<span>{this.state.thumbnail}</span>}
                Else={ <span className="subtext">Please choose an image file under 500kb (.png, .jpg, .gif, .svg)</span>}
              />
              <If When={this.props.errors.thumbnail} Then={<span className="errors">{`File: ${this.props.errors.thumbnail}`}</span>}/>
            </div>
          </div>
          <div className="button-group">
            <button disabled={this.disabled()}>Edit Video</button>
            <button onClick={this.deleteVideo}>Delete Video</button>
          </div>
          </form>
          <ReactModal
            isOpen={this.state.submitting}
            className="upload-modal"
            overlayClassName="upload-overlay"
          >
            <progress value="0" max="100" id="upload-progress" className="upload-progress" />
            Submitting...
          </ReactModal>
      </section>
    );
  }
}
export default Edit;