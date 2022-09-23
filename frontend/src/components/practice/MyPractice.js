import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getMyPracticeDescSessions,  getPracticeDescSessions } from "../../actions/practiceDescSessions";
import {  getMyPracticeIdentifySessions,  getPracticeIdentifySessions } from "../../actions/practiceIdentifySessions";
import Loader from "../layout/Loader.js";

export class MyPractice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      block: "cardiovascular",
      subject: this.props.subject,
      sessions: [],
      selectedPracticeDescSessionId: null,
      selectedPracticeDescSession: null,
      username: null,
      isReady: false,
      pushIdentify: true,
      pushDesc: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value, selectedBlock: event.target.value});
    console.log(this.state.selectedBlock, "Hey")
  }
  rendering(user) {
      
    if (user && this.state.isUpdating == true) {
        if (this.state.username !== null) {
      this.setState({
        isUpdating: false,
      });
    }
      this.setState({username: user.name})
      this.props.getMyPracticeDescSessions(user.id);
      this.props.getMyPracticeIdentifySessions(user.id);

      if (this.state.pushIdentify) {
      setTimeout(() => this.props.practiceIdentifySessions.forEach(session => {
        let sessions= this.state.sessions
        sessions.push(session)
        this.setState({sessions: sessions, pushIdentify: false})
      }), 1000);
    }
    //   if (this.state.pushDesc) {
    //   setTimeout(() =>     this.props.practiceDescSessions.forEach(session => {
    //     let sessions= this.state.sessions
    //     sessions.push(session)
    //     this.setState({sessions: sessions, pushDesc: false})
    //   }), 1100);
    // }
    }
  }

  static propTypes = {
    //This is the first "cluster" from the func down below
    getMyPracticeDescSessions: PropTypes.func.isRequired,
    getMyPracticeIdentifySessions: PropTypes.func.isRequired,
    getPracticeDescSessions: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }
  render() {
    const { user } = this.props.auth;  

        // The loading handler
        if (this.state.isReady == false) {
          setTimeout(() => this.rendering(user), 1200);
          setTimeout(() => this.setState({ isReady: true }), 1500);
          }
          // The loading component
          if (this.state.isReady == false) {
            return (
            <Loader/>
            );
            }
    if (this.state.isReady) {      
    return (
      <div className="container">
        <div id="cards_landscape_wrap-2" className="mb-5">
          <h1 className="text-center pt-2 tawassamBlue" style={{fontSize: "3rem"}}>
          Practice
        </h1>
        <h3 style={{color: "#10a1b6"}} className="text-center pb-2 mb-5 mt-2">❝ What you practice grows stronger ❞</h3>
        <div className="mx-auto px-5" >
        <select className="form-select form-select-lg mb-3 text-center" value={this.state.selectedBlock} onChange={this.handleChange}>
          <option selected>Choose block to practice on:</option>
          <option value="musculoskeletal">Musculoskeletal</option>
          <option value="genitourinary">Genitourinary</option>
          <option value="endocrine">Endocrine</option>
          <option disabled value="cardiovascular">Cardiovascular</option>
          <option disabled value="respiratory">Respiratory</option>
          <option disabled value="hemOnc">Hematology/Oncology</option>
          <option disabled value="neurology">Neurology</option>
          <option disabled value="gastrointestinal">Gastrointestinal</option>

        </select>
        </div>

        <div className="row mb-5 d-flex justify-content-center">
        { this.state.selectedBlock == "cardiovascular" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/cardiovascular/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/CardioTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                        <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Cardiovascular</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
        )}
        { this.state.selectedBlock == "musculoskeletal" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/musculoskeletal/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Musculoskeletal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
        )}
{ this.state.selectedBlock == "respiratory" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/respiratory/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Respiratory</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "hemOnc" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/hemOnc/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Hematology/Oncology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "neurology" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/neurology/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Neurology</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "endocrine" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/endocrine/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Endocrine</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{ this.state.selectedBlock == "gastrointestinal" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/gastrointestinal/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Gastrointestinal</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
{this.state.selectedBlock == "genitourinary" && (
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="/#/genitourinary/practice">
                  <div class="card-flyer">
                    <div class="text-box">
                      <div class="image-box">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                          alt=""
                        />
                      </div>
                      <div class="text-container">
                      <h6><i className="far fa-play-circle" span={{fontSize: "1.4rem"}}></i> Practice Genitourinary</h6>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
)}
            </div>

        </div>

        <p className="my-2"></p>
        {/* Previous Sessions */}
        <hr/>
        <div>
        <h4 className="text-center py-2 tawassamBlue">
          {this.state.username +"'s"} Previous Sessions
        </h4>
        <p></p>
        <div style={{ maxHeight: "600px", overflow: "auto"}} className="mb-5">
        <table className="table table-striped">
          <thead>
            <tr>
            <th className="text-center"><span className="tawassamYellow">Type</span></th>
                <th className="text-center"><span className="tawassamYellow">Block</span></th>
                <th className="text-center"><span className="tawassamYellow">Date</span></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.sessions.map((session) => (
              <tr key={session.id}>
                  <td className="tawassamBlue text-center">{session.practiceType}</td>
                  <td className="tawassamBlue text-center">{session.block}</td>
                  <td className="tawassamBlue text-center">{session.date}</td>

                <td>
                  {session.practiceType == "Description" && (
                  <a
                    href= {`#/${session.block}/practice/description/results/${session.id}`}
                    className="btn tawassamYellowBG"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedPracticeDescriptionSessionId: session.id,
                        selectedPracticeDescriptionSession: session,
                      });
                    }}
                  >
                    View Results
                  </a>
                  )}
                  {/* To Determine if the sessions is completed or not */}
                  {(session.practiceType == "Identification" && session.result !== null ) && (
                  <Fragment>
                  {(session.practiceType == "Identification" && typeof session.result.answeredQuestions !== 'undefined') && (
                <Fragment>
                  {/* In case session was completed */}
                  {(session.practiceType == "Identification" && session.questions.length == session.result.answeredQuestions.length) && (  
                  <a
                    href= {`#/${session.block}/practice/identification/results/${session.id}`}
                    className="btn tawassamYellowBG"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedPracticeIdentifySessionId: session.id,
                        selectedPracticeIdentifySession: session,
                      });
                    }}
                  >
                    View Results
                  </a>
                  )}
                  {/* In case session was NOT completed */}               
                    {(session.practiceType == "Identification" && session.questions.length !== session.result.answeredQuestions.length ) && (
                  <a
                    href= {`#/${session.block}/practice/identification/${session.id}`}
                    className="btn tawassamYellowBG"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedPracticeIdentifySessionId: session.id,
                        selectedPracticeIdentifySession: session,
                      });
                    }}
                  >
                    View Session
                  </a>
                  )}
                  </Fragment>
                  )}
                  </Fragment>
                  )}

                  {(session.practiceType == "Identification" && session.result === null ) && (
                  <a
                    href= {`#/${session.block}/practice/identification/${session.id}`}
                    className="btn tawassamYellowBG"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={(e) => {
                      this.setState({
                        selectedPracticeIdentifySessionId: session.id,
                        selectedPracticeIdentifySession: session,
                      });
                    }}
                  >
                    View Session
                  </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
        </div>
      </div>
    );
  }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  practiceDescSessions: state.practiceDescSessions.practiceDescSessions,
  practiceIdentifySessions: state.practiceIdentifySessions.practiceIdentifySessions,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMyPracticeDescSessions, getPracticeDescSessions, getMyPracticeIdentifySessions, })(MyPractice);