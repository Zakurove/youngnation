import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
// import { getBlockSets } from "../../actions/sets.js";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { getPracticeIdentifySessions, updatePracticeIdentifySession } from "../../actions/practiceIdentifySessions.js";
import { getImages } from "../../actions/sets.js";;

import Loader from "../layout/Loader.js";

export class DetailsPracticeIdentify extends Component {

  state = {
    isUpdating: true,
    isCreating: false,
    isReady: false,
    isPending: true,
    isViewing: false,
    block: this.props.block,
    sets: [],
    images: this.props.sessionImages,
    results: [],
    isAnswering: true,
    practiceIdentifySession: null,
    setsArray: [],
    selectedSetId: null,
    selectedSet: null,
    solvedQuestions: [],
    blockLink: null,
    currentSlide: 0,
    currentIndex: 0,
    selectedQuestion: {index: '1'},
    orderedImages: [],
    call: true
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
  randomArrayShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
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
      // this.props.getImages(this.state.block);
      this.setState({ selectedQuestion: this.props.practiceIdentifySession.questions[0], selectedQuestionOptions: this.randomArrayShuffle(this.props.practiceIdentifySession.questions[0].options) })
      if (this.props.practiceIdentifySession.result !== 'undefined' && this.props.practiceIdentifySession.result !== null) {
        let solvedQuestions = []
        this.props.practiceIdentifySession.result.answeredQuestions.forEach(question => {
          solvedQuestions.push(question.question.index)
        })
        this.setState({ selectedOption: this.props.practiceIdentifySession.result.answeredQuestions[0].chosenOption.id, results: this.props.practiceIdentifySession.result.answeredQuestions, isAnswering: false, solvedQuestions: solvedQuestions })
      }
    }


  }

  static propTypes = {
    practiceIdentifySession: PropTypes.object.isRequired,
    getPracticeIdentifySessions: PropTypes.func.isRequired,
    getImages: PropTypes.func.isRequired,
    sessionImages: PropTypes.array.isRequired,
    updatePracticeIdentifySession: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
  };

  //For the radio buttons
  handleCheckElement = (e) => {
    this.setState({ selectedOption: e.target.value })
  }

  //To go back to the previous question
  onBack = (e) => {
    let currentSetIndex = this.props.practiceIdentifySession.questions.findIndex((question) => this.state.selectedQuestion.index == question.index)
    let newIndex = currentSetIndex -= 1
    let changeText = false
    let selectedQuestion = this.props.practiceIdentifySession.questions[newIndex]
    let selectedQuestionOptions = this.randomArrayShuffle(selectedQuestion.options)
    //To change the chosen option if going to a solved question
    let solvedQuestion = this.state.results.find((question) => question.question.index == selectedQuestion.index);
    if (typeof solvedQuestion !== 'undefined') {
      var selectedOption = solvedQuestion.chosenOption.id
    }
    if (typeof solvedQuestion === 'undefined') {
      var selectedOption = null
    }
    setTimeout(() => this.setState({ selectedQuestion: selectedQuestion, selectedQuestionOptions: selectedQuestionOptions, currentIndex: newIndex, isAnswering: true, selectedOption: selectedOption, selectedOptionObj: null }), 100);
  }
  //To go to the next question
  onNext = (e) => {
    let currentSetIndex = this.props.practiceIdentifySession.questions.findIndex((question) => this.state.selectedQuestion.index == question.index)
    let newIndex = currentSetIndex += 1
    let changeText = false

    let selectedQuestion = this.props.practiceIdentifySession.questions[newIndex]
    let selectedQuestionOptions = this.randomArrayShuffle(selectedQuestion.options)
    //To change the chosen option if going to a solved question
    let solvedQuestion = this.state.results.find((question) => question.question.index == selectedQuestion.index);
    if (typeof solvedQuestion !== 'undefined') {
      var selectedOption = solvedQuestion.chosenOption.id
    }
    if (typeof solvedQuestion === 'undefined') {
      var selectedOption = null
    }
    setTimeout(() => this.setState({ selectedQuestion: selectedQuestion, selectedQuestionOptions: selectedQuestionOptions, currentIndex: newIndex, isAnswering: true, selectedOption: selectedOption, selectedOptionObj: null }), 100);
  }
  //After the user click 'answer', change the state of answering so the button changes to 'Go next'.
  //Put the answer in an object and push it to the results array in the state.
  onAnswer = (e) => {
    if (this.state.selectedOptionObj == null) {
      this.props.createMessage({ titleEmpty: "Please choose an option" });
    }
    else {
      this.setState({ isAnswering: false, [`questionResult${this.state.selectedQuestion.id}`]: this.state.selectedOptionObj.isCorrect })
      let results = this.state.results
      let solvedQuestions = this.state.solvedQuestions
      let questionResult = { question: this.state.selectedQuestion, isCorrect: this.state.selectedOptionObj.isCorrect, chosenOption: this.state.selectedOptionObj, }
      // setTimeout(() => results.push(questionResult), 35);
       results.push(questionResult)
      solvedQuestions.push(this.state.selectedQuestion.index)
      // setTimeout(() => this.setState({ results: results, solvedQuestions: solvedQuestions }), 50);
      this.setState({ results: results, solvedQuestions: solvedQuestions })
      let tempResults = JSON.stringify(this.state.results)
      const session = new FormData();
      session.append("date", this.props.practiceIdentifySession.date);
      session.append("owner", this.props.practiceIdentifySession.owner);
      session.append("results", tempResults)
      setTimeout(() => this.props.updatePracticeIdentifySession(session, this.props.practiceIdentifySession.id, tempResults), 300);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    let tempResults = JSON.stringify(this.state.results)
    const session = new FormData();
    session.append("date", this.props.practiceIdentifySession.date);
    session.append("owner", this.props.practiceIdentifySession.owner);
    session.append("results", tempResults)
    setTimeout(() => this.props.updatePracticeIdentifySession(session, this.props.practiceIdentifySession.id, tempResults), 300);


    //  Go to results page
    setTimeout(() => this.props.history.push(`/${this.state.blockLink}/practice/identification/results/${this.props.practiceIdentifySession.id}`), 1000);

  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // componentDidMount() {
  //   this.props.getPracticeIdentifySessions(this.props.block);
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
      // 
      // setTimeout(() => this.setState({ call: false }), 1000);
    }
    if (this.state.call == false ){
      this.rendering()
      setTimeout(() =>       
      this.props.practiceIdentifySession.questions.forEach(question => {
        let thisImage = this.props.sessionImages.find((image) => image.id == question.imageId)
        let orderedImages = this.state.orderedImages
        orderedImages.push(thisImage)
        this.setState({orderedImages: orderedImages})
       }), 1200);

       if (this.state.orderedImages.length > 0) {
        setTimeout(() => this.setState({ isReady: true }), 1500);
      }
    }
    }

    // The loading component
    if (this.state.isReady == false) {
      return (
        <Loader />
      );
    }
    //The List component
    if (this.state.isReady == true) {
      
      return (
        <div className="container my-5">
          <h1 className="text-center py-2 tawassamBlue">
            {this.state.block} Practice Session
          </h1>
          <a className="btn btn-secondary mt-1" href={`#/${this.state.blockLink}/practice/identification`}>
            <i class="fas fa-arrow-left"></i> Previous Page
          </a>
          <hr />
          <p></p>

          <div className="row flex-sm-row-reverse mb-4 justify-content-center" style={{ maxHeight: "770px" }}>
            {/* Slider and buttons above it */}
            <div className="col-md-8 " style={{ padding: "0px" }} >
              {/* Sets row */}
              <div className="row justify-content-center text-center mt-2">
                <div className="col-12">
                  <div className="text-center justify-content-center">
                    <Zoom>
                      {this.state.selectedQuestion && (
                        <img
                          index={this.state.index}
                          src={this.state.orderedImages[this.state.currentIndex].image}
                          // src={this.state.orderedImages[1].image}
                          style={{
                            maxWidth: "880px",
                            maxHeight: "800px",
                          }}
                        />
                      )}
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            {/* Options */}
            <div className="col-md-6" style={{ padding: "0px" }}>
              <div className="col-12 p-2 px-3" >

                {/* Session Options */}
                {this.state.isAnswering && !this.state.solvedQuestions.includes(this.state.selectedQuestion.index) && (
                  <div className="card mt-3" style={{ minHeight: "250", maxHeight: "500px", overflow: "auto" }}>
                    <table className="table table-striped mb-0" >
                      <thead>
                        <tr>

                        </tr>
                      </thead>
                      <tbody>
                        {this.state.selectedQuestionOptions.map((option) => (

                          <tr key={option.id}>
                            <td>
                              <input
                                key={option.id}
                                onChange={(e) => {
                                  this.handleCheckElement(e)
                                  this.setState({ selectedOptionObj: option })
                                }}
                                type="radio"
                                style={{ width: "20px", height: "20px" }}
                                className="mx-2 align-self-center"
                                value={option.id}
                                checked={this.state.selectedOption == option.id}

                              /></td>
                            <td className="" style={{ color: "#10a1b6" }}>{option.text}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {(this.state.solvedQuestions.includes(this.state.selectedQuestion.index) || this.state.isAnswering == false) && (
                  <div className="card mt-3" style={{ minHeight: "250", maxHeight: "500px", overflow: "auto" }}>
                    <table className="table table-striped mb-0" >
                      <thead>
                        <tr>

                        </tr>
                      </thead>
                      <tbody>
                        {this.state.selectedQuestionOptions.map((option) => (

                          <tr key={option.id}>
                            <td>
                              <input
                                key={option.id}
                                onChange={(e) => this.handleCheckElement(e)}
                                disabled
                                type="radio"
                                style={{ width: "20px", height: "20px" }}
                                className="mx-2 align-self-center text-danger"
                                value={option.id}
                                checked={this.state.selectedOption == option.id}

                              />

                            </td>

                            {option.isCorrect == "false" && (
                              <td className="text-danger" >
                                {option.text}
                              </td>
                            )}
                            {option.isCorrect == "true" && (
                              <td className="text-success" >
                                {option.text}
                              </td>
                            )}

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>


            </div>
          </div>

          <div className="row"><p></p></div>
          <div className="row d-flex justify-content-center">
            {this.state.currentIndex != 0 && (
              <div className=" col-6 px-4 d-grid">
                <button type="submit" onClick={this.onBack} className="btn btn-lg btn-secondary mt-4">
                  <i className="far fa-arrow-alt-circle-left" style={{ fontSize: "1.4rem" }}></i> Previous Set
                </button>
              </div>
            )}
            {this.state.isAnswering && !this.state.solvedQuestions.includes(this.state.selectedQuestion.index) && (
              <div className="px-4 col-6 d-grid">
                <button type="submit" onClick={this.onAnswer} className="btn btn-lg btn-secondary tawassamBlueBG mt-4">
                  <i className="far fa-play-circle" style={{ fontSize: "1.4rem" }}></i> Answer
                </button>
              </div>
            )}
            {((this.state.isAnswering == false || this.state.solvedQuestions.includes(this.state.selectedQuestion.index)) && this.state.currentIndex < this.props.practiceIdentifySession.questions.length - 1) && (
              <div className="px-4 col-6 d-grid">
                <button type="submit" onClick={this.onNext} className="btn btn-lg btn-secondary tawassamBlueBG mt-4">
                  <i className="far fa-arrow-alt-circle-right" style={{ fontSize: "1.4rem" }}></i> Go Next
                </button>
              </div>
            )}
            {((this.state.isAnswering == false || this.state.solvedQuestions.includes(this.state.selectedQuestion.index)) && this.state.currentIndex >= this.props.practiceIdentifySession.questions.length - 1) && (
              <div className="px-4 col-6 d-grid">
                <button type="submit" onClick={this.onSubmit} className="btn btn-lg btn-warning  mt-4">
                  <i className="fas fa-flag-checkered" style={{ fontSize: "1.4rem" }}></i> End and Show Results
                </button>
              </div>
            )}
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
    sets: [],
    images:[],
    questions: [{title: "Loading"}]
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
  return { practiceIdentifySession: practiceIdentifySession, auth: auth, sessionImages: sessionImages, images: images, };
}


export default connect(mapStateToProps, { getImages, getPracticeIdentifySessions, updatePracticeIdentifySession, createMessage })(DetailsPracticeIdentify);
