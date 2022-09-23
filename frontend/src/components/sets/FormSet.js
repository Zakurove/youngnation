import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { addSet } from '../../actions/sets.js';
import { createMessage } from "../../actions/messages";


//FilePond
 import { FilePond, File, registerPlugin } from 'react-filepond';
 import 'filepond/dist/filepond.min.css';
 import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
 import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
 import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
 import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
 registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);


 export class FormSet extends Component {
   state = {
     title: '',
     description: '',
     highYield: '',
     references: '',
     slideImages: "",
     block: this.props.block,
     subject: this.props.subject,
     features: [{featureTitle: "Hello this is the first feature", featureDescription: "this is the description"}]
   }
     static propTypes = {
       addSet: PropTypes.func.isRequired,
       block: PropTypes.string.isRequired,
       subject: PropTypes.string.isRequired,
       backToList: PropTypes.func.isRequired,
     };

     onChange = e => this.setState ({ [e.target.name]: e.target.value });

     onSubmit = (e) => {
       e.preventDefault();
       if (this.state.title.trim() == "") {
        this.props.createMessage({ titleEmpty: "'Title field is required" });
      } 
      else if (this.state.title.trim() !== "") {
       const set = new FormData();
       set.append('title', this.state.title)
       set.append('description', this.state.description);
       set.append('highYield', this.state.highYield);
       set.append('references', this.state.references);
       set.append('block', this.props.block);
       set.append('subject', this.props.subject);
       this.pond.getFiles()
       .map(fileItem => fileItem.file)
       .forEach(file => {
        set.append('image', file, file.name);
        
       });
       this.props.addSet(set);
       this.setState({
         title: "",
         description: "",
         highYield: "",
         references: "",
         slideImages: "this is slideImages, Hello!"
       })
       
       this.props.backToList()

     };
    }
     render() {
       const {title, description, highYield, references, files, setFiles } = this.state;
       return (
         <div className="container mb-5 mt-5" >
           <h1 className="text-center py-2 tawassamBlue">{this.props.block} {this.props.subject}: Create Set</h1>
           <Button
          className="btn btn-secondary mb-2"
          onClick={this.props.backToList}
          
        >
         <i class="fas fa-arrow-left"></i> Previous Page
        </Button>
        <hr/>
          <div className="row pt-4 mb-2" >
            
            <div className="col-6">
            <form onSubmit={ this.onSubmit} id="setForm">
              <div className="form-group">
                <h4 className="tawassamYellow">Title: <span className="tawassamBlue">(required)</span></h4> 
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
                <h4 className="tawassamYellow mt-4">Definition: <span className="tawassamBlue">(required)</span></h4> 
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.onChange}
                  value={description}
                  placeholder="Definition of the focus in this set"
                  rows="2"
                />
              </div>
              <div className="form-group">
                <h4 className="tawassamYellow mt-4">High Yield Notes: <span className="text-secondary">(optional)</span></h4>
                <textarea
                  className="form-control"
                  type="text"
                  name="highYield"
                  onChange={this.onChange}
                  value={highYield}
                  placeholder="Notes and information that should be known regarding this set"
                  rows="4"
                />
              </div>
              <hr/>


              {/* <h4 className="tawassamYellow">Key Features <span className="text-secondary">(optional)</span></h4> */}
              {/* For each feature, create this div below */}

              {/* <div className="mx-3">
              <div className="form-group">
                <h5 className="tawassamBlue mt-3">2- Feature Title:</h5>
                <input
                  className="form-control"
                  type="text"
                  name="featureTitle"
                  onChange={this.onChange}
                  value={this.state.featureTitle}
                  placeholder="Title of this feature"
                />
              </div>
              <div className="form-group">
                <h5 className="tawassamBlue mt-3">2- Feature Description:</h5>
                <textarea
                  className="form-control"
                  type="text"
                  name="featureDescription"
                  onChange={this.onChange}
                  value={this.state.featureDescription}
                  placeholder="Describe the feature and how it can be identified"
                  rows="2"
                />
              </div>
              </div>  */}
              {/* {this.state.features.map((feature) => (
                
                              <div className="mx-3">
                              <div className="form-group">
                                <h5 className="tawassamBlue mt-3">{feature.index}- Feature Title:</h5>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="featureTitle"
                                  onChange={this.onChange}
                                  value={this.state.featureTitle}
                                  placeholder="Title of this feature"
                                />
                              </div>
                              <div className="form-group">
                                <h5 className="tawassamBlue mt-3">{feature.index}- Feature Description:</h5>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  name="featureDescription"
                                  onChange={this.onChange}
                                  value={this.state.featureDescription}
                                  placeholder="Describe the feature and how it can be identified"
                                  rows="2"
                                />
                              </div>
                              <Button
               className="btn tawassamBlueBG mb-2"
                onClick={(e) => {
                  console.log(feature, "hey")
                }}
                >
               <i class="fas fa-plus-circle"></i>  Log feature
             </Button>
                              </div>
              ))}
              <div className='justify-content-center text-center mt-3'>
              <Button
               className="btn tawassamBlueBG mb-2"
                // onClick={this.props.backToList}
                >
               <i class="fas fa-plus-circle"></i>  Add a new feature
             </Button>
             </div>
              <hr/> */}
              <div className="form-group">
                <h4 className="tawassamYellow mt-4">References: <span className="tawassamBlue">(required)</span></h4> 
                <textarea
                  className="form-control"
                  type="text"
                  name="references"
                  onChange={this.onChange}
                  value={references}
                  placeholder="References for used content"
                />
              </div>

            </form>
            </div>
            <div className = "col-6">
            <div className="form-group" form = "setForm">
               <h4 className="tawassamYellow text-center">Upload Set Images <span className="tawassamBlue">(required)</span></h4> 
                <FilePond
              name="image"
              ref={ref => this.pond = ref}
              files={this.state.files}
              allowMultiple={true}
              allowReorder={true}
              acceptedFileTypes='image/*'
              onuploadfiles={(fileitems => {
                this.setState({
                  files: fileitems.map(fileitem => fileitem.file)
                });
              })}
              onupdatefiles={(fileitems => {
                this.setState({
                  files: fileitems.map(fileitem => fileitem.file)
                });
              })}
              form = "setForm"
              />
              </div>
            </div>
           
            <div className="form-group d-grid" form = "setForm">
              <button type="submit" className="btn btn-lg tawassamBlueBG btn-block mt-5 mb-5" onClick={this.onSubmit}>
              Create This Set
              </button>
            </div>
 
          </div>
          </div>
       )
     }
   }

  export default connect(null, { addSet, createMessage })(FormSet);
