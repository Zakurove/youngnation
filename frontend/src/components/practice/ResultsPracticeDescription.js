import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getBlockSets } from "../../actions/sets.js";
import { getPracticeDescSessions } from "../../actions/practiceDescSessions.js";
import { getPracticeDescInputs } from "../../actions/practiceDescInputs.js";
import Loader from "../layout/Loader.js";

export class ResultsPracticeDescription extends Component {

state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isPending: true,
      isViewing: false,
      block: this.props.block,
      sets: [],
      practiceDescInputs: [],
      practiceDescSession: null,
      setsArray: [],
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
      currentSlide: 0,
      currentIndex: 0,
      // subjectLink: null,
    };


  //Before render, to fetch info about this list regarding subject and block

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
//--------------------------------------------------------------------------------
  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.block == "Hematology/Oncology") {
        this.setState({
          blockLink: "hemOnc",
        });
      }
      if (this.props.block !== "Hematology/Oncology") {
        const blockLink = this.props.block.toLowerCase();
        this.setState({
          blockLink: blockLink,
        });
      }

      this.setState({
        isUpdating: false,
      });
      this.props.getBlockSets(this.state.block);
      this.props.getPracticeDescSessions(this.state.block);
      this.props.getPracticeDescInputs(this.state.block);
    }

  }

  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    practiceDescSession: PropTypes.object.isRequired,
    getBlockSets: PropTypes.func.isRequired,
    getPracticeDescSessions: PropTypes.func.isRequired,
    addPracticeDescInput: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
  };

//  onBack = (e) => {
//   let currentSetIndex = this.props.practiceDescSessionSets.findIndex((set) =>  this.state.selectedSet.id == set.id)
//   let newIndex = currentSetIndex -= 1
//   this.setState({selectedSet: this.props.practiceDescSessionSets[newIndex], currentIndex: newIndex})
//   // setTimeout(() => this.setState({[`practiceDescInput${this.state.selectedSet.id}`]: ""}), 200);
//  } 
//  onNext= (e) => {
//   let currentSetIndex = this.props.practiceDescSessionSets.findIndex((set) =>  this.state.selectedSet.id == set.id)
//   let newIndex = currentSetIndex += 1
//   this.setState({selectedSet: this.props.practiceDescSessionSets[newIndex], currentIndex: newIndex})
//  } 


  // onSubmit = (e) => {
  //   e.preventDefault();
  //   let shouldSubmit = true
  //   this.props.practiceDescSessionSets.forEach((set) => {
  //     if (this.state[`practiceDescInput${set.id}`] == null || this.state[`practiceDescInput${set.id}`] ==  "") {
  //       this.props.createMessage({ titleEmpty: "Please fill every set with a description" });
  //        shouldSubmit = false
  //     }
  //     if (shouldSubmit) {
  //       this.props.practiceDescSessionSets.forEach((set) => {
  //           const practiceDescriptionInput = new FormData();
  //           setTimeout(() => practiceDescriptionInput.append('description', [`practiceDescInput${set.id}`]), 100);
  //           practiceDescriptionInput.append('block', this.props.block);
  //           practiceDescriptionInput.append('setId', set.id)
  //           practiceDescriptionInput.append('sessionId', this.props.practiceDescSession.id)
  //           this.props.addPracticeDescInput(practiceDescriptionInput)

  //       }
  //       )}
        
  //   })

  //  //  Go to results page
  //  setTimeout(() => this.props.history.push(`/${this.state.blockLink}/practice/description/results/${this.props.practiceDescSession.id}`), 1000);

  // };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    this.props.getBlockSets(this.props.block);
    this.props.getPracticeDescSessions(this.props.block);
    this.props.getPracticeDescInputs(this.props.block);
  }

  render() {
    const { user } = this.props.auth;
    // The loading handler
    if (this.state.isReady == false) {
    setTimeout(() => this.props.getBlockSets(this.props.block), 1000);
    setTimeout(() => this.props.getPracticeDescSessions(this.props.block), 1000);
    setTimeout(() => this.props.getPracticeDescInputs(this.props.block), 1000);
    setTimeout(() => this.rendering(), 1300);
    setTimeout(() => this.setState({ isReady: true }), 1600);
    }

    // The loading component
    if (this.state.isReady == false) {
      return (
      <Loader/>
      );
      }
    //The List component
    if (this.state.isReady == true) {
      return (
        <div className="container my-5">
          <h1 className="text-center py-2 tawassamBlue">
            {this.state.block} Practice Session Results
          </h1>
          {/* <h1 className="text-center py-2 tawassamBlue">
            (Description)
          </h1> */}
          {/* <hr /> */}
          <a className="btn btn-secondary mt-1" href={`#/${this.state.blockLink}/practice`}>
          <i class="fas fa-arrow-left"></i> Back to Practice
          </a>
          <h4 className="text-secondary py-1 text-center">
                       Below are correct sets' descriptions along with your answers.
             </h4>
          <hr />
          <p></p>

                                      <div className="row flex-sm-row-reverse mb-4" >
                                     
                                    {this.props.practiceDescSessionInputs.map((input) => (
                                    <div className="col-md-6 p-2 px-4">
                                      
                                            {this.props.practiceDescSessionSets.map((set) => (
                                              <Fragment>
                                                { input.sets && ( 
                                                  <Fragment>
                                              { input.sets.includes(set.id) && ( 
                                            <div className=" mb-3 p-4 card mt-3"  style={{  minHeight: "250", maxHeight: "500px", overflow: "auto"}}>
                                                <h2 className="card-title tawassamYellow text-center mb-4 mt-1">{set.title}</h2>
                                                <h5 className="text-secondary text-center mb-1 mt-1">Actual Description:</h5>
                                                <p className="text-start card-text px-2 mb-0" style={{color: "#10a1b6", fontSize: "1.5rem"}}>{set.description}</p>
                                                <hr/>
                                                
                                                <h5 className="text-secondary text-center mb-1 mt-1">Answered as:</h5>
                                                <p className="text-start card-text px-2 mb-3" style={{color: "#10a1b6", fontSize: "1.5rem"}}>{input.description}</p>
                                          </div>
                                          )} 
                                          </Fragment>
                                          )} 
                                          </Fragment>
                                          ))}
                                    </div>
                                    ))}
                                    </div>
<div className="row mb-2"><p></p></div>


        </div>
      );
    }

  }
}

function getPracticeSessionById(practiceDescSessions, id) {
  var practiceDescSession = practiceDescSessions.find((practiceDescSession) => practiceDescSession.id == id);
  return Object.assign({ practiceDescSession }, practiceDescSession);
}


function mapStateToProps(state, ownProps) {
  let practiceDescSessions = state.practiceDescSessions.practiceDescSessions;
  let practiceDescInputs = state.practiceDescInputs.practiceDescInputs;
  let sets = state.sets.sets;
  let auth = state.auth;
  let practiceDescSession = {
    block: "",
    sets: [],
    practiceDescInputs: [],
  };
  let practiceDescSessionSets = 
    [{id: "", title: "This Session Has No Sets", description: "This Session Has No Sets", images: [], owner_username: "three", owner: null},];
    let practiceDescSessionInputs = 
    [{id: "", description: "This Input Has No Description", owner_username: "three", owner: null},];
  //Filtering through all sessions to get this one
  let selectedSessionId = ownProps.match.params.id;
  if (selectedSessionId && practiceDescSessions.length > 0) {
    practiceDescSession = getPracticeSessionById(practiceDescSessions, selectedSessionId);
  }
  
  if (practiceDescSession.sets.length > 0) {
  //Filtering through all sets to get the ones that are associated with this session
  practiceDescSessionSets = sets.filter((set) =>  practiceDescSession.sets.includes(set.id))
  }

  if (practiceDescSession.practiceDescInputs.length > 0) {
    //Filtering through all inputs to get the ones that are associated with this session
    practiceDescSessionInputs = practiceDescInputs.filter((input) =>  practiceDescSession.practiceDescInputs.includes(input.id))
    console.log(practiceDescSessionInputs, "How many inputs do we have here?")
    }

//returning
  return { practiceDescSession: practiceDescSession, practiceDescSessionInputs: practiceDescSessionInputs, practiceDescInputs: practiceDescInputs, auth: auth, practiceDescSessionSets: practiceDescSessionSets, sets: sets };
}


export default connect(mapStateToProps, { getBlockSets, getPracticeDescInputs, getPracticeDescSessions })(ResultsPracticeDescription);
