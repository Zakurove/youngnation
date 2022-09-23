import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getBlockSets } from "../../actions/sets.js";
import { getPracticeDescSessions } from "../../actions/practiceDescSessions.js";
import { addPracticeDescInput } from "../../actions/practiceDescInputs.js";
import Loader from "../layout/Loader.js";

export class DetailsPracticeDescription extends Component {

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

  //   handleCheckElement = (e) => {
  //     let checkedSets = this.state.sets
  //     checkedSets.forEach(set => {
  //       if (set.id == e.target.value) {
  //         set.isChecked =  e.target.checked
  //       }
  //       })
  //     this.setState({sets: checkedSets})
  //  }
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
      // const subjectLink = this.props.subject.toLowerCase();
      this.setState({
        // subjectLink: subjectLink,
        isUpdating: false,
      });
      this.props.getBlockSets(this.state.block);
      this.props.getPracticeDescSessions(this.state.block);
      this.setState({selectedSet: this.props.practiceDescSessionSets[0]})
    }
        // //Pending 
        // if (this.state.isPending == true) {
        //   // To give the 'sets' an isChecked field
        //   let newSeti;
        //   let newSets = [...this.props.sets]
        //   for (newSeti = 0; newSeti < newSets.length; newSeti++) {
        //     newSets[newSeti] = {...newSets[newSeti], isChecked: false}
        //   }
        //   this.setState ({
        //     sets: newSets,
        //     isPending: false
        //   })
        // }

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
    // subject: PropTypes.string.isRequired,
  };

 onBack = (e) => {
  let currentSetIndex = this.props.practiceDescSessionSets.findIndex((set) =>  this.state.selectedSet.id == set.id)
  let newIndex = currentSetIndex -= 1
  let changeText = false
  let selectedSet = this.props.practiceDescSessionSets[newIndex]
  if (this.state[`practiceDescInput${selectedSet.id}`] == null || this.state[`practiceDescInput${selectedSet.id}`] == ""){
     changeText = true
  }
  setTimeout(() => this.setState({selectedSet: selectedSet, currentIndex: newIndex}), 50);
  if (changeText) {
  setTimeout(() => this.setState({[`practiceDescInput${selectedSet.id}`]: ""}), 100);
    }
 } 
 onNext= (e) => {
  let currentSetIndex = this.props.practiceDescSessionSets.findIndex((set) =>  this.state.selectedSet.id == set.id)
  let newIndex = currentSetIndex += 1
  let changeText = false
  let selectedSet = this.props.practiceDescSessionSets[newIndex]
  if (this.state[`practiceDescInput${selectedSet.id}`] == null || this.state[`practiceDescInput${selectedSet.id}`] == ""){
     changeText = true
  }
  setTimeout(() => this.setState({selectedSet: selectedSet, currentIndex: newIndex}), 50);
  if (changeText) {
  setTimeout(() => this.setState({[`practiceDescInput${selectedSet.id}`]: ""}), 100);
    }
 } 

//   let selectedSet = this.props.practiceDescSessionSets[newIndex]
//   this.setState({selectedSet: selectedSet, currentIndex: newIndex})
//   this.onChange
//  } 


  onSubmit = (e) => {
    e.preventDefault();
    let shouldSubmit = true
    this.props.practiceDescSessionSets.forEach((set) => {
      if (this.state[`practiceDescInput${set.id}`] == null || this.state[`practiceDescInput${set.id}`] ==  "") {
        this.props.createMessage({ titleEmpty: "Please fill every set with a description" });
         shouldSubmit = false
      
        }
        })
      if (shouldSubmit) {
        this.props.practiceDescSessionSets.forEach((set) => {
            const practiceDescriptionInput = new FormData();
            practiceDescriptionInput.append('description', this.state[`practiceDescInput${set.id}`])
            practiceDescriptionInput.append('block', this.props.block);
            practiceDescriptionInput.append('setId', set.id)
            practiceDescriptionInput.append('sessionId', this.props.practiceDescSession.id)
            this.props.addPracticeDescInput(practiceDescriptionInput)
          })
        }
      

        
    
   //  Go to results page
   setTimeout(() => this.props.history.push(`/${this.state.blockLink}/practice/description/results/${this.props.practiceDescSession.id}`), 1000);

  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    this.props.getBlockSets(this.props.block);
    this.props.getPracticeDescSessions(this.props.block);
  }

  render() {

    const { user } = this.props.auth;

    // The loading handler
    if (this.state.isReady == false) {
    setTimeout(() => this.props.getBlockSets(this.props.block), 1000);
    setTimeout(() => this.props.getPracticeDescSessions(this.props.block), 1000);
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
            {this.state.block} Practice Session
          </h1>
          {/* <h1 className="text-center py-2 tawassamBlue">
            (Description)
          </h1> */}
          {/* <hr /> */}
          <a className="btn btn-secondary mt-1" href={`#/${this.state.blockLink}/practice/description`}>
          <i class="fas fa-arrow-left"></i> Previous Page
          </a>
          <hr />
          <p></p>

<div className="row flex-sm-row-reverse mb-4" style={{ maxHeight: "770px" }}>

{/* Slider and buttons above it */}
<div className="col-md-8" style={{  padding: "0px" }} >
  {/* Buttons Row over the slider */}
  <div className="row">
  <div className="col-12 p-0">
    {/* <div className="col-8" style={{ padding: "1px" }}> */}
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
  <div className="row mt-2">
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
        {this.state.selectedSet.images.map((slide, index) => (
          <div
            key={slide.id}
            onClick={(e) => {
              this.setState({
                selectedImageId: slide.id,
              });
            }}
            style={{ pointerEvents: "all" }}
          >

            <img
              index={this.state.index}
              src={slide.image}
              style={{
                maxWidth: "1097px",
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

  <div className="col-12 p-2 px-3" >

  {/* Set Description */}
  <div className=" mb-3 py-2 px-3 card mt-3"  style={{  minHeight: "250", maxHeight: "500px", overflow: "auto"}}>
      <h4 className="card-title tawassamYellow text-center mb-2 mt-1">Description</h4>
      <h5 className="text-secondary text-center mb-2 mt-1">Put your answer here:</h5>
  <textarea type="text" className="text-start card-text p-2" onChange={this.onChange} rows="6" style={{color: "#10a1b6", fontSize: "1.5rem"}} name={[`practiceDescInput${this.state.selectedSet.id}`]} value={this.state[`practiceDescInput${this.state.selectedSet.id}`]}></textarea>
            </div>
</div>


</div>
</div>
<div className="row mb-2"><p></p></div>
<div className="row pt-4 mt-2 d-flex justify-content-center"> 
{ this.state.currentIndex != 0 && (
<div className=" col-6 px-4 d-grid">
             <button type="submit" onClick={this.onBack} className="btn btn-lg btn-secondary mt-4">
             <i className="far fa-arrow-alt-circle-left" style={{fontSize: "1.4rem"}}></i> Previous Set
             </button>
             </div>    
             )} 
             { this.state.currentIndex < this.props.practiceDescSessionSets.length-1 && (
            <div className="px-4 col-6 d-grid">
             <button type="submit" onClick={this.onNext} className="btn btn-lg btn-secondary tawassamBlueBG mt-4">
             <i className="far fa-arrow-alt-circle-right" style={{fontSize: "1.4rem"}}></i> Answer & Go Next Set
             </button>
             </div>  
             )}   
              { this.state.currentIndex >= this.props.practiceDescSessionSets.length-1 && (
            <div className="px-4 col-6 d-grid">
             <button type="submit" onClick={this.onSubmit} className="btn btn-lg btn-warning  mt-4">
             <i className="fas fa-flag-checkered" style={{fontSize: "1.4rem"}}></i> Submit and Show Results
             </button>
             </div>  
             )}  
           </div>                         
                    

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
  let sets = state.sets.sets;
  let auth = state.auth;
  let practiceDescSession = {
    block: "",
    sets: [],
  };
  let practiceDescSessionSets = 
    [{id: "", title: "This Session Has No Sets", description: "This Session Has No Sets", images: [], owner_username: "three", owner: null},];

  //Filtering through all sessions to get this one
  let selectedSessionId = ownProps.match.params.id;
  if (selectedSessionId && practiceDescSessions.length > 0) {
    practiceDescSession = getPracticeSessionById(practiceDescSessions, selectedSessionId);
  }
  
  if (practiceDescSession.sets.length > 0) {
  //Filtering through all sets to get the ones that are associated with this session
  practiceDescSessionSets = sets.filter((set) =>  practiceDescSession.sets.includes(set.id))
  }

//returning
  return { practiceDescSession: practiceDescSession, auth: auth, practiceDescSessionSets: practiceDescSessionSets, sets: sets };
}


export default connect(mapStateToProps, { getBlockSets, addPracticeDescInput, getPracticeDescSessions, createMessage })(DetailsPracticeDescription);
