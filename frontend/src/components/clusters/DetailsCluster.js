import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMessage } from "../../actions/messages";
import { Link, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { EditCluster } from "./EditCluster.js";
// import { DeleteSet } from "./DeleteCluster.js";
import * as clusterActions from "../../actions/clusters.js";
import * as setActions from "../../actions/sets.js";
import Loader from "../layout/Loader.js";


export class DetailsCluster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
      modalShow: false,
      noteContent: "",
      noteContentEdit: "",
      x: 0,
      y: 0,
      noteMode: false,
      noteButtonText: "Enable Adding Notes",
      showNotesButtonText: "Hide Notes",
      showNotes: false,
      isEditing: false,
      tooltipOpen: false,
      popoverOpen: false,
      cluster: this.props.cluster,
      sets: [this.props.sets],
      selectedImageId: null,
      EditedNoteId: null,
      noteEditMode: false,
      modalEditShow: false,
      noteEditingState: false,
      noteDisplay: "",
      optionsState: false,
      isRemovingImage: false,
      deleteModalShow: false,
      user: null,
      chosenSet: null,
      isReady: false,
    };

    this.pointXY = this.pointXY.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteModalOpen = this.deleteModalOpen.bind(this);
    this.toggleRemoveImages = this.toggleRemoveImages.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.saveCluster = this.saveCluster.bind(this);
    this.deleteCluster = this.deleteCluster.bind(this);
    this.doneImage = this.doneImage.bind(this);
  }
  static propTypes = {
    cluster: PropTypes.object.isRequired,
    sets: PropTypes.array.isRequired,
    notedSets: PropTypes.object,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  //-------------------------------------------------------------------------
  //                                 SLIDER & IMAGES
  next = () => {
    this.setState((state) => ({
      currentSlide: state.currentSlide + 1,
    }));
  };
  prev = () => {
    this.setState((state) => ({
      currentSlide: state.currentSlide - 1,
    }));
  };
  updateCurrentSlide = (index) => {
    const { currentSlide } = this.state;

    if (currentSlide !== index) {
      this.setState({
        currentSlide: index,
      });
    }
  };

  //------------------------------------------------------------------------------
  //                                     EDIT & DELETE
  saveCluster(event) {
    setTimeout(() => this.setState({  clusterSets: this.props.sets.filter((set) =>  this.props.cluster.sets.includes(set.id)) }), 300);
    setTimeout(() => this.setState({ isEditing: false }), 500);
    this.setState({ optionsState: false });



  }
  doneImage(event) {
    this.setState({ isRemovingImages: false });
    this.setState({ optionsState: false });
    this.forceUpdate();
  }
  //To delete Cluster
  deleteCluster(event) {
    this.props.actions.deleteCluster(this.state.cluster.id);
  }

  //For knowing if the user is editing or not and acting accordingly
  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  toggleRemoveImages() {
    this.setState({ isRemovingImages: !this.state.isRemovingImages });
  }
  
  //For toggling options button
  toggleOptions() {
    this.setState({ optionsState: !this.state.optionsState });
  }
  
  //----------------------------------------------------------------------------------------------
  //                                      NOTE SYSTEM

  //For getting the point where the user wanted to add the note
  pointXY(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  //For poping-up the note
  togglePopover() {
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  //Functions related to the modal for adding notes
  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    this.modalClose();
  }

  modalOpen() {
    this.setState({ modalShow: true });
  }
  modalEditOpen() {
    this.setState({ modalEditShow: true });
  }

  deleteModalOpen() {
    this.setState({ deleteModalShow: true });
  }
  modalClose() {
    this.setState({
      modalInputName: "",
      modalShow: false,
    });
  }
  modalEditClose() {
    this.setState({
      modalInputName: "",
      modalEditShow: false,
    });
  }
  deleteModalClose() {
    this.setState({
      modalInputName: "",
      deleteModalShow: false,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.state.chosenSet.title);
    set.append("description", this.state.chosenSet.description);
    set.append("references", this.state.chosenSet.references);
    set.append("editingState", "adding");
    set.append("noteContent", this.state.noteContent);
    set.append("x", this.state.x);
    set.append("y", this.state.y);
    set.append("setImage_id", this.state.selectedImageId);

    this.props.setActions.addNote(set, this.state.chosenSet.id);
    setTimeout(() => this.props.setActions.getSetById( this.props.cluster.block, this.state.chosenSet.id), 300);
    
    setTimeout(() =>
    this.setState({
      noteContent: "",
      x: "",
      y: "",
      chosenSet: this.props.notedSets,
    })
    , 500);
  };
  onEditSubmit = (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.state.chosenSet.title);
    set.append("description", this.state.chosenSet.description);
    set.append("references", this.state.chosenSet.references);
    set.append("noteId", this.state.EditedNoteId);
    set.append("noteContent", this.state.noteContent);
    set.append("setImage_id", this.state.selectedImageId);
    set.append("editingState", "editing");
    this.props.setActions.editNote(set, this.state.chosenSet.id);
    setTimeout(() => this.props.setActions.getSetById(this.props.cluster.block, this.state.chosenSet.id), 300);
    setTimeout(() =>
    this.setState({
      noteContent: "",
      x: "",
      y: "",
      chosenSet: this.props.notedSets,
    })
    , 500);
  };
  onDeleteSubmit = (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.state.chosenSet.title);
    set.append("description", this.state.chosenSet.description);
    set.append("references", this.state.chosenSet.references);
    set.append("noteId", this.state.EditedNoteId);
    set.append("setImage_id", this.state.selectedImageId);
    set.append("editingState", "deleting");
    this.props.setActions.deleteNote(set, this.state.chosenSet.id);
    this.props.setActions.getSetById(this.props.cluster.block, this.state.chosenSet.id)
    setTimeout(() =>
    this.setState({
      noteContent: "",
      x: "",
      y: "",
      chosenSet: this.props.notedSets,
    })
    , 300);
  };
  //For handeling the text on the 'Adding notes' button.
  changeNoteButtonText() {
    if (this.state.noteMode == true) {
      this.setState({
        noteButtonText: "Enable Adding Notes",
      });
    } else {
      this.setState({
        noteButtonText: "Disable Adding Notes",
      });
    }
  }
  changeShowNotesButtonText() {
    if (this.state.showNotes == true) {
      this.setState({
        showNotesButtonText: "Hide Notes",
      });
    } else {
      this.setState({
        showNotesButtonText: "Show Notes",
      });
    }
  }

  //For handeling clicking on the div for adding notes
  handleToggleNoteMode() {
    this.setState((currentState) => ({
      noteMode: !currentState.noteMode,
    }));
  }
  handleShowNotesMode() {
    this.setState((currentState) => ({
      showNotes: !currentState.showNotes,
    }));
  }
  changeNoteDisplay() {
    if (this.state.showNotes == true) {
      this.setState({
        noteDisplay: "initial",
      });
    } else {
      this.setState({
        noteDisplay: "none",
      });
    }
  }
  handleOverlay(e) {
    if (this.state.noteMode == true) {
      this.modalOpen();
      this.pointXY(e);
    }
  }
  handleNoteEditOverlay(e) {
    this.modalEditOpen();
  }

  //onChange Notes
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  //------------------------------------------------------------------------------
  //                                     LIFECYCLE
  componentDidMount() {
    this.setState({
      tooltipOpen: true,
      user: this.props.user,
    });
    this.props.actions.getAllClusters();
    this.props.setActions.getAllSets();

    
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.cluster.id != nextProps.cluster.id) {
      this.setState({ cluster: nextProps.cluster });
    }
  }

  //------------------------------------------------------------------------------
  //                                        RENDER
  render() {
    const { user } = this.props.auth;
    const clusterId = this.props.selectedClusterId;
    const { x, y } = this.state;
    if (this.state.redirectDelete == true) {
      return <Redirect to={"/clusters"} />;
    }
    if (this.state.isEditing) {
      return (
        <Fragment>
          <EditCluster
            createMessage={this.props.createMessage}
            rerenderParent={this.rerenderParent}
            cluster={this.props.cluster}
            sets={this.props.sets.filter((set) => set.block == this.props.cluster.block)}
            block={this.props.cluster.block}
            // subject={this.props.cluster.subject}
            updateCluster={this.props.actions.updateCluster}
            onChange={this.updateClusterState}
            onSave={this.saveCluster}
          />
        </Fragment>
      );
    }

    // // The loading handler
    // if (this.state.isReady == false) {
    //   setTimeout(() => this.setState({ isReady: true, ] }), 1000);
    //   }
 // The loading handler
    if (this.state.isReady == false || !this.state.chosenSet) {
      setTimeout(() => this.setState({ isReady: true, chosenSet: this.props.clusterSets[0] }), 1000);
      }
      // The loading component
      if (this.state.isReady == false || !this.state.chosenSet) {
        return (
        <Loader/>
        );
        }

    if (this.state.isReady) {
    return (
      <Fragment>
        <Modal
          show={this.state.modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.modalClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="tawassamBlue text-center mx-auto"
            >
             Add Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="noteForm" onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  value={this.state.noteContent}
                  name="noteContent"
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  rows="3"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="warning"
              onClick={(e) => this.modalClose(e)}
              className="btn tawassamYellowBG"
              form="noteForm"
            >
              Save
            </Button>
            <Button
              onClick={(e) => this.modalClose(e)}
              className="btn btn-secondary ms-2"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.modalEditShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.modalEditClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="tawassamBlue text-center mx-auto"
            >
              Edit Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="noteForm" onSubmit={this.onEditSubmit}>
              <div className="form-group">
                <textarea
                  type="text"
                  value={this.state.noteContent}
                  name="noteContent"
                  onChange={(e) => this.handleChange(e)}
                  className="form-control"
                  rows="3"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              variant="wanrning"
              onClick={(e) => this.modalEditClose(e)}
              className="btn tawassamBlueBG"
              form="noteForm"
            >
              Save
            </Button>
            <Button
              onClick={(e) => this.modalEditClose(e)}
              className="btn btn-secondary ms-2"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.deleteModalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={(e) => this.deletModalClose(e)}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-info text-center"
            >
              Are you sure you want to delete this cluster?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="outline-danger"

              // To delete the cluster
              onClick={(e) => {
                this.deleteModalClose(e);
                this.deleteCluster(e);
                
              }}

              // To go back to previous page after deleteing the cluster
              href={`#/${this.props.cluster.block.toLowerCase()}/clusters`}

              style={{ justifyContent: "center" }}
              form="noteForm"
            >
              <i class="far fa-trash-alt"></i>
              <span> </span>
              Remove
            </Button>
            <Button
              onClick={(e) => this.deleteModalClose(e)}
              className="btn btn-secondary ms-2 "
              style={{ justifyContent: "center" }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container mt-5" style={{marginBottom: "20rem"}} key={this.props.cluster.id}>
          <div className="row">
            <div className="col">
              <h1 className="tawassamBlue text-center my-3">
                {this.props.cluster.title}
              </h1>
              <div className=" mb-3 mt-4 px-3 card"  style={{   maxHeight: "300px", overflow: "auto"}}>
                  <h5 className="card-title tawassamYellow text-center mb-2 mt-1">Cluster's Explanation</h5>
              <p className="  text-center card-text  " style={{color: "#10a1b6", fontSize: "1.5rem"}}>{this.props.cluster.description}</p>
              </div>
            </div>
          </div>
              <hr className="mb-4 mt-2" />
             {/* Current set title */}
              <div className="row mt-2 mb-2"><div className="col"><h4 className=" text-center tawassamDarkBlue" style={{fontWeight: "normal"}}>Current Set: {this.state.chosenSet.title}</h4></div></div>
          {/* Row that contains both slider and explanation */}
          <div className="row flex-sm-row-reverse" style={{ height: "770px" }}>

            {/* Slider and buttons above it */}
            <div className="col-md-8 " style={{  padding: "0px" }} >
              {/* Buttons Row over the slider */}
              <div className="row">
              <div className="col-12 p-0">
                {/* <div className="col-8" style={{ padding: "1px" }}> */}
                <div className="col-sm-12 col-md-12 col-lg">
                {user
                  ? this.props.auth.user.id ==
                      this.state.chosenSet.owner && (
                      <Button
                        onClick={(e) => {
                          this.handleToggleNoteMode(e);
                          this.changeNoteButtonText(e);
                        }}
                        variant="info"
                        className="btn tawassamBlueBG float-end me-2 mb-1 mx-1"
                        style={{
                          marginLeft: "15px",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                        }}
                      >
                        {this.state.noteButtonText}
                      </Button>
                    )
                  : ""}
                <Button
                  onClick={(e) => {
                    this.handleShowNotesMode(e);
                    this.changeShowNotesButtonText(e);
                    this.changeNoteDisplay(e);
                  }}
                  variant="info"
                  className="btn tawassamBlueBG float-end mb-1 mx-1"
                  style={{
                    
                    paddingTop: "4px",
                    paddingBottom: "4px",
                  }}
                >
                  <i className="fas fa-info-circle"></i>
                  <span> </span>
                  {this.state.showNotesButtonText}
                </Button>
                </div>

                <div className="col-sm-12 col-md-12 col-lg"> 
                <Button
                  onClick={this.prev}
                  variant="warning"
                  className="ms-3 btn tawassamYellowBG fa fa-chevron-circle-left float-start"
                  style={{ fontSize: "20px" }}
                ></Button>
                <Button
                  onClick={this.next}
                  variant="warning"
                  className="btn tawassamYellowBG fa fa-chevron-circle-right ms-1 float-start"
                  style={{ fontSize: "20px" }}
                ></Button>
              </div>
              </div>
              </div>
             
              {/* Sets row */}
              <div className="row">
              <div className="col-12">
                <div className="slide-container">
                  <Carousel
                    selectedItem={this.state.currentSlide}
                    onChange={this.updateCurrentSlide}
                    useKeyboardArrows={true}
                    swipeable={true}
                    emulateTouch={true}
                    swipeScrollTolerance={5}
                    infiniteLoop={true}
                    autoPlay={false}
                    showThumbs={false}
                    dynamicHeight={true}
                  >
                    {this.state.chosenSet.images.map((slide, index) => (
                      <div
                        key={slide.id}
                        onClick={(e) => {
                          this.setState({
                            selectedImageId: slide.id,
                          });
                          this.handleOverlay(e);
                        }}
                        style={{ pointerEvents: "all" }}
                      >
                        {slide.notes.map((note, index) => (
                          <Fragment key={note.id}>
                            <div
                              style={{
                                zIndex: "3",
                                fontSize: "20px",
                                color: "white",
                                pointerEvents: "all",
                                position: "absolute",
                                left: note.x + "px",
                                top: note.y + "px",
                                display: this.state.noteDisplay,
                              }}
                              className="fas fa-info-circle note-logo"
                              id={"note" + note.id}
                            >
                              <UncontrolledPopover
                                trigger="hover"
                                placement="bottom"
                                target={"note" + note.id}
                              >
                                <PopoverHeader
                                  style={{
                                    minHeight: "60px",
                                    minWidth: "125px",
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {" "}
                                  <span className="tawassamBlue m-2">{note.noteContent}</span>
                                </PopoverHeader>
                                
                                  {user
                                    ? this.props.auth.user.id ==
                                        this.state.chosenSet.owner && (
                                          <PopoverBody>
                                        <Button
                                        className="me-2 tawassamBlueBG"
                                          size="sm"
                                          variant="info"
                                          onClick={(e) => {
                                           
                                            
                                            this.setState({
                                              noteContent: note.noteContent,
                                              EditedNoteId: note.id,
                                              
                                            })
                                            
                                            this.handleNoteEditOverlay(e);
                                          }}
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline-danger"
                                          onClick={async (e) => {
                                            await this.setState({
                                              EditedNoteId: note.id,
                                            });
                                            this.onDeleteSubmit(e);
                                          }}
                                        >
                                          Delete
                                        </Button>
                                        </PopoverBody>
                                      )
                                    : ""}
                                
                              </UncontrolledPopover>
                            </div>
                          </Fragment>
                        ))}

                        <img
                          index={this.state.index}
                          src={slide.image}
                          style={{
                            width: "auto",
                            maxHeight: "800px",
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
              </div>
            </div>
            
            {/* Explanation and buttons above it */}
            <div className="col-md-4 " style={{  padding: "0px" }}>
            
            <div className="col-12">
              {this.state.optionsState && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{
                    marginBottom: "5px",
                    marginRight: "2px",
                    marginLeft: "2px",
                  }}
                  onClick={(e) => {
                    this.deleteModalOpen(e);
                  }}
                >
                  <i class="far fa-trash-alt"></i>
                  <span> </span>
                  Delete Cluster
                </Button>
              )}
              {this.state.optionsState && (
                <Button
                  variant="info"
                  className="tawassamBlueBG"
                  size="sm"
                  style={{
                    marginBottom: "5px",
                    marginRight: "2px",
                    marginLeft: "2px",
                  }}
                  onClick={this.toggleEdit}
                >
                  <i class="fas fa-edit"></i>
                  <span> </span>
                  Edit Cluster
                </Button>
              )}
            </div>
          
              <div className="col-12">
                <Button
                  className="btn btn-secondary "
                  style={{ marginBottom: "3px", marginRight: "3px" }}
                  href={`#/${this.props.cluster.block.toLowerCase()}/clusters`}
                >
                   <i class="fas fa-arrow-left"></i> Back to List
                </Button>
                {user
                  ? this.props.auth.user.id ==
                      this.props.cluster.owner && (
                      <Button
                        className="tawassamYellowBG float-end me-2"
                        style={{ marginBottom: "3px", marginRight: "3px" }}
                        variant="warning"
                        onClick={this.toggleOptions}
                      >
                        <i class="fas fa-cog"></i>
                        <span> </span>
                        Options
                      </Button>
                    )
                  : ""}
                <div
                  className="collapsible form-group"
                  style={{ display: "none" }}
                >
                  <a href="#" className="btn tawassamBlue my-2">
                    Update Current Image
                  </a>
                  <a href="#" className="btn tawassamBlue my-2">
                    Update Title/Description
                  </a>
                  <a href="#" className="btn tawassamBlue">
                    Add new image
                  </a>
                </div>
              </div>

              <div className="col-12 p-2 px-3" >

            <h5 className="text-secondary text-center mt-2">Associated Sets:</h5>
            {/* Sets List */}
            <div style={{ maxHeight: "300px", overflow: "auto"}} className="style-1 mb-2">
            <table className="table table-striped " > 
            <thead>
              
              <tr
                            onClick={(e) => {
                              this.setState({
                                chosenSet: set,
                                currentSlide: 0,
                              });
                              event.preventDefault();
                            }}
                            href="#"
              >
                {/* <th></th> */}
                <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Title</span></th>
                {/* <th>Owner</th> */}
                 </tr>
            </thead>
            <tbody>
              {this.props.clusterSets.map((set) => (
                
                <tr key={set.id} className="clusterSets" style={{cursor: "pointer", }}               
                  onClick={(e) => {
                  this.setState({
                    chosenSet: set,
                    currentSlide: 0,
                  });
                  
                }}
                >
                  <td style={{color: "#10a1b6"}}>{set.id}</td>
                  <td style={{color: "#10a1b6"}}>{set.title}</td>

                </tr>
              ))}
            </tbody>
          </table>
             </div>

                              {/* Set Description */}
                              <div className=" mb-3 py-1 px-3 card mt-3"  style={{  minHeight: "150", maxHeight: "500px", overflow: "auto"}}>
                  <h5 className="card-title tawassamYellow text-center mb-2 mt-1">Current Set Explanation</h5>
              <p className="text-start card-text " style={{color: "#10a1b6", fontSize: "1.5rem"}}>{this.state.chosenSet.description}</p>
                        </div>
             {/* Set References */}
              <div className=" mb-3 py-1 px-3 card mx-3 mt-4"  style={{  minHeight: "20", maxHeight: "300px", overflow: "auto"}}>
                  <h5 className="card-title text-secondary text-center mb-2 mt-1">References</h5>
              <p className="  text-start card-text text-secondary" style={{maxHeight: "100px", overflow: "auto"}}><pre style={{fontFamily: "inherit", color: "inherit", fontSize: "inherit"}}>{this.state.chosenSet.references}</pre> </p>
              </div>
            </div>

            
            </div>
          </div>
        </div>

        <div className="mb-5 mt-5"><span> </span></div>
      </Fragment>
    );
  }


  }
}


function getClusterById(clusters, id) {
  var cluster = clusters.find((cluster) => cluster.id == id);
  return Object.assign({ cluster }, cluster);
}
function getClusterSets(sets, array) {
  var clusterSets = sets.filter((set) =>  array.includes(set.id))

  return Object.assign({ clusterSets }, clusterSets);
  
}



function mapStateToProps(state, ownProps) {
  let clusters = state.clusters.clusters;
  let sets = state.sets.sets;
  let notedSets = state.sets.notedSets

  let auth = state.auth;
  let cluster = {
    title: "",
    description: "",
    references: "",
    block: "",
    subject: "",
    id: "",
    sets: [],
  };
  let clusterSets = 
    [{id: "", title: "Loading Sets...", description: "",references: "", images: [], owner_username: "three", owner: null},];

  //Filtering through all clusters to get this one
  let selectedClusterId = ownProps.match.params.id;
  if (selectedClusterId && clusters.length > 0) {
    cluster = getClusterById(clusters, selectedClusterId);
  }
  
  if (cluster.sets.length > 0) {
  //Filtering through all sets to get the ones that are associated with this cluster
   clusterSets = sets.filter((set) =>  cluster.sets.includes(set.id))
  }

//returning
  return { cluster: cluster, auth: auth, clusterSets: clusterSets, sets: sets, notedSets: notedSets };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clusterActions, dispatch),
    setActions: bindActionCreators(setActions, dispatch),
    createMessage: bindActionCreators(createMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsCluster);
