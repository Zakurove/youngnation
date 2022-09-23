import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { createMessage } from "../../actions/messages";
// import { loadingOn, loadingOff } from "../../actions/loading.js";
import { addPracticeDescSession } from "../../actions/practiceDescSessions.js";
import PracticeDescriptionForm from "./PracticeDescriptionForm.js";
import Loader from "../layout/Loader.js";

export class PracticeList extends Component {
  static propTypes = {
  };
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      practiceDescription: false,
      isReady: false,
      isViewing: false,
      block: this.props.block,
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
    };
    this.backToList = this.backToList.bind(this);
  }
  //Before render, to fetch info about this list regarding subject and block
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

    }

    this.backToList = this.backToList.bind(this);
  }

  static propTypes = {
    //This is the first "set" from the func down below
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
    addPracticeDescSession: PropTypes.func.isRequired,
  };

  backToList(event) {
    this.setState({ practiceDescription: false, isViewing: false, isUpdating: true, isReady: false });
  }

  render() {

    // if (this.state.practiceDescription) {
    //   return (
    //     <Fragment>
    //       <PracticeDescriptionForm
    //         block={this.state.block}
    //         backToList={this.backToList}
    //         addPracticeDescSession={this.props.addPracticeDescSession}
    //         createMessage={this.props.createMessage}
    //       />
    //     </Fragment>
    //   );
    // }
    const { user } = this.props.auth;
    {
      this.rendering();
    }

    // The loading handler
    if (this.state.isReady == false) {
    setTimeout(() => this.setState({ isReady: true }), 1500);
    }
    // The loading component
    if (this.state.isReady == false) {
      return (
      <Loader/>
      );
      }

    //The List component
    if (this.state.isReady) {
      return (
        <div id="cards_landscape_wrap-2">
          <h1 className="text-center py-2 tawassamBlue">
            {this.state.block} Practice List
          </h1>
        
        <div className="container pt-4">

          {/* <hr /> */}
          <div className="d-flex justify-content-start mt-2" >
          <Button
            className="btn btn-secondary mb-1 "
            href={`#/${this.state.blockLink}`}
          >
           <i class="fas fa-arrow-left"></i> Back to Block
           </Button>
          </div>


          <hr />
          <div className="row pt-2" >

          {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6" >
                    <a href={`#/${this.state.blockLink}/practice/description`}                           
                    //  onClick={(e) => {
                    //           this.setState({
                    //             practiceDescription: true,
                    //           });
                    //           event.preventDefault();
                    //         }}
                            >
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects p-5">
                                <i className="far fa-file-alt mb-2 tawassamBlue" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Description</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div> */}



                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <a href={`#/${this.state.blockLink}/practice/identification`}                     
                    //  onClick={(e) => {
                    //           this.setState({
                    //             practiceIdentification: true,
                    //           });
                    //           event.preventDefault();
                    //         }}
                            >
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">


                                <div class="image-boxSubjects p-5">
                                <i className="fas fa-search mb-2 tawassamBlue" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Identification</h6> 
                                </div>

                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="javascript:void(0)" className="disabled" onClick={(e) => {
                              this.setState({
                                practiceIdentification: true,
                              });
                              event.preventDefault();
                            }}>
                  <div class="card-flyer mt-1 mb-5" >
                    <div class="text-box">
                      <div class="image-boxSubjects justify-content-center d-flex p-5" style={{position: "relative"}}>

                         <i className="far fa-file-alt mb-2 tawassamBlue" style={{opacity: "0.5"}}/>
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="codepoiesisBlue">Coming Soon</h1>
                              </section>
                      </div>
                      <div class="text-container">                                    
                                    <h6>Description</h6> 
                                </div>

                    </div>
                  </div>
                </a>
              </div>
                
                {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="javascript:void(0)" className="disabled" onClick={(e) => {
                              this.setState({
                                practiceIdentification: true,
                              });
                              event.preventDefault();
                            }}>
                  <div class="card-flyer mt-1 mb-5" >
                    <div class="text-box">
                      <div class="image-boxSubjects justify-content-center d-flex p-5" style={{position: "relative"}}>

                         <i className="fas fa-search mb-2 tawassamBlue" style={{opacity: "0.5"}}/>
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="codepoiesisBlue">Coming Soon</h1>
                              </section>
                      </div>
                      <div class="text-container">                                    
                                    <h6>Identification</h6> 
                                </div>

                    </div>
                  </div>
                </a>
              </div> */}

                {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <a href="#"                     onClick={(e) => {
                              this.setState({
                                practiceNote: true,
                              });
                              event.preventDefault();
                            }}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects p-5">
                                <i className="fas fa-info-circle mb-2 tawassamBlue" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Practice Notes</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div> */}
                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="javascript:void(0)" className="disabled" onClick={(e) => {
                              this.setState({
                                practiceIdentification: true,
                              });
                              event.preventDefault();
                            }}>
                  <div class="card-flyer mt-1 mb-5" >
                    <div class="text-box">
                      <div class="image-boxSubjects justify-content-center d-flex p-5" style={{position: "relative"}}>

                         <i className="fas fa-info-circle mb-2 tawassamBlue" style={{opacity: "0.5"}}/>
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="codepoiesisBlue">Coming Soon</h1>
                              </section>
                      </div>
                      <div class="text-container">                                    
                                    <h6>Notes</h6> 
                                </div>

                    </div>
                  </div>
                </a>
              </div>


                {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <a href="#"                     onClick={(e) => {
                              this.setState({
                                practiceMCQ: true,
                              });
                              event.preventDefault();
                            }}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects p-5">
                                <i className="far fa-question-circle mb-2 tawassamBlue" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Practice MCQs</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div> */}
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <a href="javascript:void(0)" className="disabled" onClick={(e) => {
                              this.setState({
                                practiceIdentification: true,
                              });
                              event.preventDefault();
                            }}>
                                  <div class="card-flyer mt-1 mb-5" >
                    <div class="text-box">
                      <div class="image-boxSubjects justify-content-center d-flex p-5" style={{position: "relative"}}>

                         <i className="far fa-question-circle mb-2 tawassamBlue" style={{opacity: "0.5"}}/>
                           <section style={{position: "absolute", top: "40%", left: "10%", right: "10%"}}>
                                  <h1 className="codepoiesisBlue">Coming Soon</h1>
                              </section>
                      </div>
                      <div class="text-container">                                    
                                    <h6>MCQs</h6> 
                                </div>

                    </div>
                  </div>
                </a>
              </div>



          </div>
        </div>
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loadingState: state.loadingState,
});
// function mapDispatchToProps(dispatch) {
//   return {
//     createMessage: bindActionCreators(createMessage, dispatch)
//   };
// }

export default connect(mapStateToProps, { addPracticeDescSession, createMessage })(PracticeList);
