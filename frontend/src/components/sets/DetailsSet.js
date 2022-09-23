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
import { EditSet } from "./EditSet.js";
import { DeleteSet } from "./DeleteSet.js";
import * as setActions from "../../actions/sets.js";
import Loader from "../layout/Loader.js";

export class DetailsSet extends Component {
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
      set: this.props.set,
      testing: ["hello", "One"],
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
      call: true,
      isReady: false,
      getSets: true,
    };

    this.pointXY = this.pointXY.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteModalOpen = this.deleteModalOpen.bind(this);
    this.toggleRemoveImages = this.toggleRemoveImages.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.saveSet = this.saveSet.bind(this);
    this.deleteSet = this.deleteSet.bind(this);
    this.doneImage = this.doneImage.bind(this);
  }
  static propTypes = {
    set: PropTypes.object.isRequired,
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
  saveSet(event) {
    this.setState({ isEditing: false });
    this.setState({ optionsState: false });
    this.forceUpdate();
  }
  doneImage(event) {
    this.setState({ isRemovingImages: false });
    this.setState({ optionsState: false });
    this.forceUpdate();
  }
  //To delete set
  deleteSet(event) {
    this.props.actions.deleteSet(this.state.set.id);
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
    set.append("title", this.props.set.title);
    set.append("description", this.props.set.description);
    set.append("references", this.props.set.references);
    set.append("editingState", "adding");
    set.append("noteContent", this.state.noteContent);
    set.append("x", this.state.x);
    set.append("y", this.state.y);
    set.append("setImage_id", this.state.selectedImageId);

    this.props.actions.addNote(set, this.state.set.id);
    this.setState({
      noteContent: "",
      x: "",
      y: "",
    });
  };
  onEditSubmit = (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.props.set.title);
    set.append("description", this.props.set.description);
    set.append("references", this.props.set.references);
    set.append("noteId", this.state.EditedNoteId);
    set.append("noteContent", this.state.noteContent);
    set.append("setImage_id", this.state.selectedImageId);
    set.append("editingState", "editing");
    this.props.actions.editNote(set, this.state.set.id);
    this.setState({
      noteContent: "",
      x: "",
      y: "",
    });
  };
  onDeleteSubmit = (e) => {
    e.preventDefault();
    const set = new FormData();
    set.append("title", this.props.set.title);
    set.append("description", this.props.set.description);
    set.append("references", this.props.set.references);
    set.append("noteId", this.state.EditedNoteId);
    set.append("setImage_id", this.state.selectedImageId);
    set.append("editingState", "deleting");
    this.props.actions.deleteNote(set, this.state.set.id);
    this.setState({
      noteContent: "",
      x: "",
      y: "",
    });
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

    // this.props.actions.getSets(this.props.block, this.props.subject);
    
    
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.set.id != nextProps.set.id) {
      this.setState({ set: nextProps.set });
    }
  }

  //------------------------------------------------------------------------------
  //                                        RENDER
  render() {
    const { user } = this.props.auth;
    const setId = this.props.selectedSetId;
    const { x, y } = this.state;
    if (this.state.redirectDelete == true) {
      return <Redirect to={"/sets"} />;
    }

    if (this.state.isEditing) {
      return (
        <Fragment>
          <EditSet
            createMessage={this.props.createMessage}
            rerenderParent={this.rerenderParent}
            set={this.props.set}
            updateSet={this.props.actions.updateSet}
            onChange={this.updateSetState}
            onSave={this.saveSet}
            addSet={this.props.actions.addSet}
          />
        </Fragment>
      );
    }
    if (this.state.isRemovingImages) {
      return (
        <Fragment>
          <DeleteSet
            set={this.props.set}
            removeImage={this.props.actions.removeImage}
            doneImage={this.doneImage}
          />
        </Fragment>
      );
    }
        // The loading handler
        if (this.state.isReady == false) {
          if (this.state.call == true) {  
            if (this.state.getSets == true) {  
            this.props.actions.getAllSets()
            this.setState({ getSets: false })
            }
            if (this.props.sets.length > 0) {
              this.setState({ call: false })
            }
        }
        if (this.state.call == false) {
          setTimeout(() => this.setState({ isReady: true }), 500);
          }
      }
      // The loading component
      if (this.state.isReady == false) {
        return (
        <Loader/>
        );
        }
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
              onClick={(e) => this.modalClose(e)}
              variant="warning"
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
              onClick={(e) => this.modalEditClose(e)}
              className="btn tawssamYellowBG"
              form="noteForm"
              variant="warning"
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
              Are you sure you want to delete this set?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="danger"

              // To delete the set
              onClick={(e) => {
                this.deleteModalClose(e);
                this.deleteSet(e);
                
              }}

              // To go back to previous page after deleteing the set
              href={`#/${this.props.set.block.toLowerCase()}/sets`}

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
        <div className="container mt-5" key={this.props.set.id} style={{marginBottom: "20rem"}}>

              <h1 className="tawassamBlue text-center mb-5 mt-3">
                {this.props.set.title}
              </h1>


          {/* Row that contains both slider and explanation */}
          <div className="row flex-sm-row-reverse" style={{ height: "770px" }}>

            {/* Slider and buttons above it */}
            <div className="col-md-8  mb-4" style={{  padding: "0px" }} >
              {/* Buttons Row over the slider */}
              <div className="row">
              <div className="col-12 p-0">
                {/* <div className="col-8" style={{ padding: "1px" }}> */}
                <div className="col-sm-12 col-md-12 col-lg">

                {user
                  ? this.props.auth.user.id ==
                      this.state.set.owner && (
                      <Button
                        onClick={(e) => {
                          this.handleToggleNoteMode(e);
                          this.changeNoteButtonText(e);
                        }}
                        variant='info'
                        className="btn tawassamBlueBG float-end mb-1 me-2 mx-1"
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
                  variant='info'
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
                  variant='warning'
                  className="btn tawassamYellowBG fa fa-chevron-circle-left float-start ms-2"
                  style={{ fontSize: "20px" }}
                ></Button>
                <Button
                  onClick={this.next}
                  variant='warning'
                  className="btn tawassamYellowBG fa fa-chevron-circle-right ms-1 float-start"
                  style={{ fontSize: "20px" }}
                ></Button>
              </div>
              </div>
              </div>
             
              {/* Slider's row */}
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
                    {this.props.set.images.map((slide, index) => (
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
                                        this.props.set.owner && (
                                          <PopoverBody>
                                          <Button
                                        className="me-2 tawassamBlueBG"
                                          size="sm"
                                          variant="info"
                                          onClick={(e) => {
                                            this.setState({
                                              noteContent: note.noteContent,
                                              EditedNoteId: note.id,
                                            });
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
                                          Remove
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
                  className="btn btn-outline-danger"
                  size="sm"
                  variant="outline-danger"
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
                  Delete Set
                </Button>
              )}
              {this.state.optionsState && (
                <Button
                  className=""
                  size="sm"
                  variant='outline-danger'
                  style={{
                    marginBottom: "5px",
                    marginRight: "2px",
                    marginLeft: "2px",
                  }}
                  onClick={this.toggleRemoveImages}
                >
                  <i class="far fa-images"></i>
                  <span> </span>
                  Select Images to Remove
                </Button>
              )}
              {this.state.optionsState && (
                <Button
                 className="tawassamBlueBG"
                  size="sm"
                  variant='info'
                  style={{
                    marginBottom: "5px",
                    marginRight: "2px",
                    marginLeft: "2px",
                  }}
                  onClick={this.toggleEdit}
                >
                  <i class="fas fa-edit"></i>
                  <span> </span>
                  Edit Set & Add Images
                </Button>
              )}
            </div>
          
              <div className="col-12">
                <Button
                  className="btn ms-2 btn-secondary "
                  style={{ marginBottom: "3px", marginRight: "3px" }}
                  href={`#/${this.props.set.block.toLowerCase()}/sets`}
                  // onClick={this.props.actions.getBlockSets(this.props.set.block)}
                >
                  <i class="fas fa-arrow-left"></i> Back to sets list
                </Button>
                {user
                  ? this.props.auth.user.id ==
                      this.props.set.owner && (
                      <Button
                        className=" float-end tawassamYellowBG me-3"
                        style={{ marginBottom: "3px", marginRight: "3px" }}
                        variant='warning'
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
                  <a href="#" className="btn tawassamBlueBG my-2">
                    Update Current Image
                  </a>
                  <a href="#" className="btn tawassamBlueBG my-2">
                    Update Title/Explanation
                  </a>
                  <a href="#" className="btn tawassamBlueBG">
                    Add new image
                  </a>
                </div>
              </div>

              <div className="col-12 p-2">
                {/* Set Explanation */}
                <div className=" mb-3 py-1 px-3 card"  style={{  minHeight: "150", maxHeight: "500px", overflow: "auto"}}>
                  <h5 className="card-title tawassamYellow text-center mb-2 mt-1">Explanation</h5>
              <p className="  text-start card-text" style={{color: "#10a1b6", fontSize: "1.5rem"}} >{this.props.set.description}</p>
              </div>
                  {/* Set References */}
                  {user ? this.props.set.references && (
              <div className=" mb-3 py-1 px-3 card mx-3 mt-4"  style={{  minHeight: "20", maxHeight: "300px", overflow: "auto"}}>
                  <h5 className="card-title text-secondary text-center mb-2 mt-1">References</h5>
              <p className="  text-start card-text text-secondary" style={{maxHeight: "100px", overflow: "auto"}}><pre style={{fontFamily: "inherit", color: "inherit", fontSize: "inherit"}}>{this.props.set.references}</pre> </p>
              </div>
                                  )
                                  : ""}
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </Fragment>
    );
  }
}

function getSetById(sets, id) {
  var set = sets.find((set) => set.id == id);

  return Object.assign({ set }, set);
}

function mapStateToProps(state, ownProps) {
  let sets = state.sets.sets;

  let auth = state.auth;
  let set = {};
  let selectedSetId = ownProps.match.params.id;
  if (selectedSetId && sets.length > 0) {
    set = getSetById(sets, selectedSetId);
  }

  return { set: set, auth: auth, sets: sets };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(setActions, dispatch),
    createMessage: bindActionCreators(createMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSet);
