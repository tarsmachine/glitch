import React from "react";
import ReactModal from "react-modal";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "", description: "", mounted: false, submitting: false};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disabled = this.disabled.bind(this);
    ReactModal.setAppElement("#root");
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
    fd.append("video[thumbnail]", document.querySelector("#thumbnail").files[0]);
    fd.append("video[source]", document.querySelector("#source").files[0]);
    if(!this.disabled()){ //don't waste time trying to process an invalid form! front end validation
      
      this.setState({ submitting: true },
        ()=>$.ajax({
          url: `/api/videos`,
          method: "POST",
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

                if (percentComplete === 100) {

                }

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
    this.setState({mounted: true});
  }
  
  componentWillUnmount() {
    this.props.clearErrors();
  }
  disabled(){
    if(!this.state.mounted) return true;
    if(this.props.loading) return true;
    if(this.state.submitting) return true;
    const source = document.querySelector("#source").files[0];
    const thumbnail = document.querySelector("#thumbnail").files[0];
    return !(source && thumbnail && this.state.title && !this.props.loading);
  }

  render() {
    return (
      <section className="upload-video">
        <h1>Upload Video</h1>
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
              {this.state.thumbnail ? <span>{this.state.thumbnail}</span> : <span className="subtext">Please choose an image file under 500kb (.png, .jpg, .gif, .svg)</span>}
              {this.props.errors.thumbnail ? <span className="errors">{`File: ${this.props.errors.thumbnail}`}</span> : ""}
            </div>
            <div className="selector">
              
              <input type="file" id="source" name="video[source]" accept="video/*, .mp4" onChange={this.handleInput("source")}/>
              <label htmlFor="source">Select Source Video</label>
              {this.state.source ? <span>{this.state.source}</span> : <span className="subtext">Please choose a video file under 25MB</span>}
              {this.props.errors.source ? <span className="errors">{`File: ${this.props.errors.source}`}</span> : ""}
            </div>
          </div>
            
            <button disabled={this.disabled()}>Upload Video</button>
          </form>
          <ReactModal
            isOpen={this.state.submitting}
            className="upload-modal"
            overlayClassName="upload-overlay"
          >
            <progress value="0" max="100" id="upload-progress" className="upload-progress" />
            Uploading...
          </ReactModal>
      </section>
    );
  }
}
export default Settings;