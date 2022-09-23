import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { getPracticeIdentifySessions } from "../../actions/practiceIdentifySessions.js";
import { getImages } from "../../actions/sets.js";;
import Loader from "../layout/Loader.js";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CountUp from 'react-countup';
export class ResultsPracticeIdentify extends Component {

state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isPending: true,
      isViewing: false,
      block: this.props.block,
      practiceIdentifySession: null,
      setsArray: [],
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
      currentSlide: 0,
      currentIndex: 0,
      orderedImages: [],
      call: true
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
      // this.props.getPracticeIdentifySessions(this.state.block);
      // this.props.getImages();
    }

  }

  static propTypes = {
    //This is the first "set" from the func down below
    practiceIdentifySession: PropTypes.object.isRequired,
    getPracticeIdentifySessions: PropTypes.func.isRequired,
    getImages: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
  };


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // componentDidMount() {
  //   this.props.getPracticeIdentifySessions(this.props.block);
  //   this.props.getImages();
  // }

  render() {
    const { user } = this.props.auth;
    // The loading handler
    if (this.state.isReady == false) {
    if (this.state.call == true) {
      this.props.getPracticeIdentifySessions(this.props.block)
      this.props.getImages(this.props.block)
      if (this.props.sessionImages.length > 0) {
        this.setState({ call: false })
      }
    }
    if (this.state.call == false) {
    this.rendering()
    setTimeout(() =>     this.props.practiceIdentifySession.result.answeredQuestions.forEach(question => {
      this.setState({[`questionCorrect${question.question.index}`]: question.question.options.find((option) => option.isCorrect == 'true')})
    }), 1000);
    setTimeout(() =>       
    this.props.practiceIdentifySession.questions.forEach(question => {
      let thisImage = this.props.sessionImages.find((image) => image.id == question.imageId)
      let orderedImages = this.state.orderedImages
      orderedImages.push(thisImage)
      this.setState({orderedImages: orderedImages})
     }), 1300);
     if (this.state.orderedImages.length > 0) {
      setTimeout(() => this.setState({ isReady: true }), 1500);
    }
  }

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
          <h1 className="text-center pt-2 pb-4 tawassamBlue">
            {this.state.block} Identification
          </h1>
          <div className="text-center mb-4">
            <CountUp className="tawassamYellow p-1" duration={1.5} style={{fontSize: "2rem"}} end={this.props.practiceIdentifySession.result.accuracy} suffix="%" /><span className="codepoiesisBlue" style={{fontSize: "1.5rem"}}> Accuracy</span>
          </div>


<div class="accordion" id="results">
{this.props.practiceIdentifySession.result.answeredQuestions.map((question) => (
  
  <div class="accordion-item">
    {/* {this.setState({[`questionCorrect${question.question.index}`]: question.question.options.find((option) => option.isCorrect == 'true')})} */}
    <h2 class="accordion-header" id={`headingQuestion${question.question.index}`}>
      <button class="accordion-button collapsed" style={{fontSize:"1.5rem"}} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseQuestion${question.question.index}`} aria-expanded="true" aria-controls={`collapseQuestion${question.question.index}`}>
      <span className="me-3" style={{color:"black"}}>{question.question.index}.</span>
      {question.isCorrect == 'true' && (
      <span className="text-success me-2"><i class="far fa-check-circle"></i></span>
      )}
            {question.isCorrect == 'false' && (
      <span className="text-danger me-2"><i class="far fa-times-circle"></i></span>
      )}
      <span className="" style={{color:"black"}}>{question.chosenOption.text}</span>
     </button>
   </h2>
    <div id={`collapseQuestion${question.question.index}`} class="accordion-collapse collapse" aria-labelledby={`headingQuestion${question.question.index}`} data-bs-parent="#results">
      <div class="accordion-body">    
        <h3 className="tawassamBlue text-center">{this.state[`questionCorrect${question.question.index}`].text}</h3>
        <div className="text-center justify-content-center">
          <Zoom>
        <img src={this.state.orderedImages[question.question.index-1].image} style={{maxWidth: "800px"}}/>
        </Zoom>
        </div>
      </div>
    </div>
  </div>
))}
</div>
        </div>
      );
    }

  }
}

function getPracticeSessionById(practiceIdentifySessions, id) {
  var practiceIdentifySession = practiceIdentifySessions.find((practiceIdentifySession) => practiceIdentifySession.id == id);
  return Object.assign({ practiceIdentifySession }, practiceIdentifySession);
}


function mapStateToProps(state, ownProps) {
  let practiceIdentifySessions = state.practiceIdentifySessions.practiceIdentifySessions;
  let images = state.images.images;
  let auth = state.auth;
  let practiceIdentifySession = {
    block: "",
    image: "",
    images:[]
  };
  let sessionImages = 
  [];
  //Filtering through all sessions to get this one
  let selectedSessionId = ownProps.match.params.id;
  if (selectedSessionId && practiceIdentifySessions.length > 0) {
    practiceIdentifySession = getPracticeSessionById(practiceIdentifySessions, selectedSessionId);
  }
  
  if (practiceIdentifySession.images.length > 0) {
    //Filtering through all sets to get the ones that are associated with this cluster
    sessionImages = images.filter((image) =>  practiceIdentifySession.images.includes(image.id))

    }
    

//returning
  return { practiceIdentifySession: practiceIdentifySession, auth: auth, sessionImages: sessionImages};
}


export default connect(mapStateToProps, { getPracticeIdentifySessions, getImages })(ResultsPracticeIdentify);
