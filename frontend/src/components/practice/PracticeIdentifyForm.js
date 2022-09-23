import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { createMessage } from "../../actions/messages";
import { getBlockSets } from "../../actions/sets.js";
import { addPracticeIdentifySession } from "../../actions/practiceIdentifySessions.js";
import Loader from "../layout/Loader.js";

export class PracticeIdentifyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isPending: true,
      isViewing: false,
      block: this.props.block,
      sets: [],
      setsArray: [],
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
      lengthSessions: this.props.practiceIdentifySessions.length
    };
  }
  static propTypes = {
    sets: PropTypes.array.isRequired,
    getBlockSets: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
    addPracticeIdentifySession: PropTypes.func.isRequired,
  };
  //To choose the sets
  handleCheckElement = (e) => {
    let checkedSets = this.state.sets
    checkedSets.forEach(set => {
      if (set.id == e.target.value) {
        set.isChecked = e.target.checked
      }
    })
    this.setState({ sets: checkedSets })
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
      this.props.getBlockSets(this.state.block);
    }
    //Pending 
    if (this.state.isPending == true && this.props.sets.length > 0) {
      // To give the 'sets' an isChecked field
      let newSeti;
      let newSets = [...this.props.sets]
      for (newSeti = 0; newSeti < newSets.length; newSeti++) {
        newSets[newSeti] = { ...newSets[newSeti], isChecked: false }
      }
      this.setState({
        sets: newSets,
        isPending: false
      })
    }

  }


  //Submit the chosen sets to start the practice by pushing each chosen set into an array then sending the selected sets in JSON format tot he backend
  onSubmit = (e) => {
    e.preventDefault();
    let setsArray = [];
    this.state.sets.forEach(set => {
      if (set.isChecked) {
        setsArray.push(set)
      }
    })
    if (setsArray == 0) {
      this.props.createMessage({ setsListEmpty: "Must select sets to pracitce on" });
    }
    else if (setsArray.length) {
      const practiceIdentify = new FormData();

      setTimeout(() => practiceIdentify.append('selectedSets', JSON.stringify(setsArray)), 300);
      practiceIdentify.append('block', this.props.block);
      practiceIdentify.append('blockSets', JSON.stringify(this.props.sets));
      setTimeout(() => this.props.addPracticeIdentifySession(practiceIdentify), 500);
      //  Go to the session's page
      setTimeout(() => this.props.history.push(`/${this.state.blockLink}/practice/identification/${this.props.practiceIdentifySessions[this.state.lengthSessions].id}`), 1000);
    }
  };
  componentDidMount() {
    this.props.getBlockSets(this.props.block);
  }
  render() {
    const { user } = this.props.auth;
    // The loading handler
    if (this.state.isReady == false) {
      setTimeout(() => this.props.getBlockSets(this.props.block), 1000);
      setTimeout(() => this.setState({ isReady: true }), 1500);
    }
    if (this.state.isReady == true) {
      this.rendering();
    }
    // The loading component
    if (this.state.isPending == true) {
      return (
        <Loader />
      );
    }
    //The List component
    if (this.state.isPending == false) {
      return (
        <div className="container my-5">
          <h1 className="text-center py-2 tawassamBlue">
            {this.state.block} Practice Session
          </h1>

          <a className="btn btn-secondary mt-1" href={`#/${this.state.blockLink}/practice`}>
            <i class="fas fa-arrow-left"></i> Previous Page
          </a>
          <h4 className="text-secondary py-1 text-center">
            Choose sets to practice on.
          </h4>
          <hr />
          <p></p>
          <div style={{ maxHeight: "700px", overflow: "auto" }}>
            <table className="table table-striped mx-2" >
              <thead>
                <tr>
                  <th></th>
                  <th><span className="tawassamYellow">ID</span></th>
                  <th><span className="tawassamYellow">Title</span></th>
                  <th ><span className="tawassamYellow">Owner</span></th>
                </tr>
              </thead>
              <tbody>
                {this.props.sets.map((set) => (
                  <tr key={set.id}>
                    <td>
                      <input
                        key={set.id}
                        onChange={(e) => this.handleCheckElement(e)}
                        type="checkbox"
                        style={{ width: "20px", height: "20px" }}
                        className="mx-2 align-self-center"
                        checked={set.isChecked}
                        value={set.id}
                      /></td>
                    <td className="" style={{ color: "#10a1b6" }}>{set.id}</td>
                    <td className="" style={{ color: "#10a1b6" }}>{set.title}</td>
                    <td className="" style={{ color: "#10a1b6" }}>{set.owner_username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row pt-4">
            <button type="submit" onClick={this.onSubmit} className="btn btn-lg btn-secondary tawassamBlueBG mt-4">
              <i className="far fa-play-circle" span={{ fontSize: "1.4rem" }}></i> Start Practice Session
            </button>
          </div>
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  sets: state.sets.sets,
  practiceIdentifySessions: state.practiceIdentifySessions.practiceIdentifySessions,
  auth: state.auth,
  loadingState: state.loadingState,
});

export default connect(mapStateToProps, { getBlockSets, addPracticeIdentifySession, createMessage })(PracticeIdentifyForm);