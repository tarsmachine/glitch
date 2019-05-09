import React from "react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: "", description: "", mounted: false};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disabled = this.disabled.bind(this);

  }
  handleInput(type) {
    return (e) => {
      e.preventDefault();
      this.setState({ [type]: e.target.value });
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("video[title]", this.state.title);
    fd.append("video[description]", this.state.description);
    fd.append("video[thumbnail]", document.querySelector("#thumbnail").files[0]);
    fd.append("video[source]", document.querySelector("#source").files[0]);
    if(!this.disabled()){ //don't waste time trying to process an invalid form! front end validation
      this.props.createVideo(fd).then(() => this.props.history.push(`/${this.props.currentUser.username}/videos`));
    }else{
      alert("Please fill in all required fields");
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
              
              <input type="file" id="source" name="video[source]" accept="video/*" onChange={this.handleInput("source")}/>
              <label htmlFor="source">Select Source Video</label>
              {this.state.source ? <span>{this.state.source}</span> : <span className="subtext">Please choose a video file under 5MB</span>}
              {this.props.errors.source ? <span className="errors">{`File: ${this.props.errors.source}`}</span> : ""}
            </div>
          </div>
            
            <button disabled={this.disabled()}>Upload Video</button>
          </form>
      </section>
    );
  }
}
export default Settings;