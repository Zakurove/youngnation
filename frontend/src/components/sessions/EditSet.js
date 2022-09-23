import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSet, updateSet } from "../../actions/sets.js";
import { createMessage } from "../../actions/messages";

//FilePond
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

export class EditSet extends Component {
  state = {
    set: this.props.set,
    title: this.props.set.title,
    description: this.props.set.description,
    references: this.props.set.references,
    setImages: this.props.set.images,
    slideImages: "this is slideImages, Hello!",
  };
  static propTypes = {
    set: PropTypes.object.isRequired,
    addSet: PropTypes.func.isRequired,
    updateSet: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.title.trim() == "") {
      this.props.createMessage({ titleEmpty: "'Title field is required" });
    } 
    else if (this.state.title.trim() !== "") {
    const set = new FormData();
    set.append("title", this.state.title);
    set.append("description", this.state.description);
    set.append("references", this.state.references);
    await this.pond
      .getFiles()
      .map((fileItem) => fileItem.file)
      .forEach((file) => {
       set.append("image", file, file.name);
      });
    this.props.updateSet(set, this.state.set.id);
    setTimeout(() =>  this.props.onSave(e), 400);
    this.setState({
      title: "",
      description: "",
      references: "",
    });
  };
}
  componentWillReceiveProps(nextProps) {
    if (this.props.set.id != nextProps.set.id) {
      this.setState({ set: nextProps.set });
    }
  }
  render() {
    const { title, description, references, files, setFiles } = this.state;
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
        <div className="col"><h1 className="tawassamBlue pb-4 text-center">Edit Set</h1></div>
        </div>
        <div className="row">
          <div className="col-6">
            <form onSubmit={this.onSubmit} id="setForm">
              <div className="form-group">
                <h4 className="tawassamYellow">Title:</h4>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                  placeholder="Title of the set"
                />
              </div>
              <div className="form-group">
                <h4 className="tawassamYellow mt-3">Explanation:</h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={description}
                  placeholder="Explanation of the set"
                  rows="6"
                />
              </div>

              <div className="form-group">
                <h4 className="tawassamYellow mt-3">References:</h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="references"
                  onChange={this.onChange}
                  value={references}
                  placeholder="References for used content"
                  rows="2"
                />
              </div>

            </form>
          </div>
          <div className="col-6">
            <div className="form-group" form="setForm">
              <h4 className="tawassamYellow">Add more images:</h4>
              <FilePond
                name="image"
                ref={(ref) => (this.pond = ref)}
                files={this.state.files}
                // files={this.state.setImages.map((slide, index) => ({
                //   source: slide.image,
                //   options: {
                //     type: "local",
                //   },
                // }))}
                acceptedFileTypes='image/*'
                allowMultiple={true}
                onuploadfiles={(fileitems) => {
                  this.setState({
                    files: fileitems.map((fileitem) => fileitem.file),
                  });
                }}
                onupdatefiles={(fileitems) => {
                  this.setState({
                    files: fileitems.map((fileitem) => fileitem.file),
                  });
                }}
                // server={{
                //   process: null,
                //   load: (source, load, error, progress, abort, headers) => {
                //     var myRequest = new Request(source);
                //     fetch(myRequest).then(function (response) {
                //       response.blob().then(function (myBlob) {
                //         load(myBlob);
                //       });
                //     });
                //   },
                // }}
                form="setForm"
              />
            </div>
          </div>
        
        </div>
        <div className="form-group">
                <div className="d-grid">
              <button
                  type="submit"
                  form="setForm"
                  className="btn mt-5 btn-block tawassamBlueBG"
                  onClick={this.onSubmit}
                >
                  Edit
                </button>
                </div>
                <div className="d-grid">
              <button
                  
                  onClick={this.props.onSave}
                  className="btn mt-2 btn-secondary btn-block"
                >
                  Cancel
                </button>
                </div>

              </div>
      </div>
    );
  }
}

export default connect(null, { addSet, updateSet, createMessage })(EditSet);

