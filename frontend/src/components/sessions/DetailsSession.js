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
import * as sessionActions from "../../actions/sessions.js";
import Loader from "../layout/Loader.js";

export class DetailsSession extends Component {
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
      session: this.props.session,
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
      getSessions: true,
    };

  }
  static propTypes = {
    set: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    };
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
    if (this.props.session.id != nextProps.session.id) {
      this.setState({ session: nextProps.session });
    }
  }

  //------------------------------------------------------------------------------
  //                                        RENDER
  render() {
    const { user } = this.props.auth;
    const sessionId = this.props.selectedSessionId;
    const { x, y } = this.state;
        // The loading handler
        if (this.state.isReady == false) {
          if (this.state.call == true) {  
            this.props.actions.getAllSessions()
            if (this.state.getSessions == true) {  
            this.props.actions.getAllSessions()
            this.setState({ getSessions: false })
            }
            if (this.props.sessions.length > 0) {
              this.props.actions.getAllSessions()
              this.setState({ call: false })
            }
        }
        if (this.state.call == false) {
          this.props.actions.getAllSessions()
          setTimeout(() => this.setState({ isReady: true }), 2000);
          }
      }
      // The loading component
      if (this.state.isReady == false) {
        return (
        <Loader/>
        );
        }
        if (this.state.isReady == true) {
    return (
      <Fragment>


        <div className="container mt-5" style={{marginBottom: "20rem"}}>
          <div className="justify-content-center row mt-2">
        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/star.png" style={{width: "10%"}} class="img-fluid ps-2 text-center" />
        </div>
             <div>
              <h1 className="talentmineBlue text-center mb-5 mt-3">
                أهلا بالموهوب  <span style={{color: "#FFC144", fontWeight: "bold"}}>{this.props.session.owner_username}</span>
              </h1>
              <h2 className="text-center">حللنا قياساتك الجسدية واهتماماتك وبناء عليها استنتجنا ان هذه الرياضة الأنسب لك مبدئيا</h2>
              </div>
              
              {/* Swimming */}
              {this.props.session.sport == 
                      "swimming" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/swimming.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > السباحة </h1>
                        </div>
                    )}
               {/* Basketball */}
               {this.props.session.sport == 
                      "basketball" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/basketball.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > كرة السلة </h1>
                        </div>
                    )} 
              {/* Fencing */}
              {this.props.session.sport == 
                      "fencing" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/fencing.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > المبارزة </h1>
                        </div>
                    )} 
               {/* Judo */}
               {this.props.session.sport == 
                      "judo" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/boxing.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > الجودو </h1>
                        </div>
                    )} 
               {/* Volleyball */}
               {this.props.session.sport == 
                      "volleyball" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/beach-volleyball.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > كرة الطائرة </h1>
                        </div>
                    )} 
               {/* Tennis */}
               {this.props.session.sport == 
                      "tennis" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tennis.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h1 className="text-center  my-3" style={{fontSize: "3rem",color: "#FFC144", fontWeight: "bold"}} > التنس </h1>
                        </div>
                    )} 
                  {/* Confused */}
               {this.props.session.sport == 
                      "DragonRiding" && (
                        <div className="m-5 justify-content-center pt-5 row">
                        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/confused.png" style={{width: "30%"}} class="img-fluid ps-2 text-center" />
                        <h2 className="text-center my-3" style={{color: "#FFC144", fontWeight: "bold"}}> انت مميز لدرجة لم تمكننا من تحديد الرياضة الأنسب, الرجاء مراجعة الفريق</h2>
                        </div>
                    )}                                                                        
                {/* Confused */}
                {(this.props.session.sport !== 
                      "swimming") && (this.props.session.sport !== 
                        "basketball") && (this.props.session.sport !== 
                          "tennis") && (this.props.session.sport !== 
                            "fencing") && (this.props.session.sport !== 
                              "volleyball") && (this.props.session.sport !== 
                                "judo") && (
                        <div className="m-5 justify-content-center pt-5 row">
                        	  <div className="row">
		<div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 mx-auto">
            <img
              src=
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/talentmineLogo.png"
              
              className="img-fluid mt-5 mb-4"
              alt="Responsive image"
              style={{width: "150%"}}
            />
            </div>
	  </div>
	  {/* <div id="loadingProgressG">
		<div id="loadingProgressG_1" className="loadingProgressG"></div>
	</div> */}
  <div className="text-center"><img id="loading-image" style={{width: "5%" }}src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="Loading..." /></div>

                        </div>
                    )} 
                                      
              <div className="mt-4 pt-3 justify-content-center text-center px-3">
              <h3 className="text-center mb-5">استثمر موهبتك واصقلها عن طريق اخذ احد المسارات من شركاءنا الذين يستخدمون تالينت-ماين المطور لاقتراحات أكثر ومعلومات أعمق </h3>
          <Link to="/soon">
            <button type="button" className="btn btn-info btn-lg talentminePurpleBG" style={{padding: "0.7rem 1.5rem", fontSize: "2.3rem", borderRadius: "2.9rem", borderColor:"#523b93"}}>اصقل موهبتك</button>
            </Link>
          </div>
        </div>

        <div></div>
      </Fragment>
    );
  }
}
}

function getSessionById(sessions, id) {
  var session = sessions.find((session) => session.id == id);

  return Object.assign({ session }, session);
}

function mapStateToProps(state, ownProps) {
  let sessions = state.sessions.sessions;

  let auth = state.auth;
  let session = {};
  let selectedSessionId = ownProps.match.params.id;
  if (selectedSessionId && sessions.length > 0) {
    session = getSessionById(sessions, selectedSessionId);
  }

  return { session: session, auth: auth, sessions: sessions };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
    createMessage: bindActionCreators(createMessage, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsSession);
