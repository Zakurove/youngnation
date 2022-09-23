import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCluster, updateCluster } from "../../actions/clusters.js";
import { Button, Form } from "react-bootstrap";
import { createMessage } from "../../actions/messages";
import Loader from "../layout/Loader.js";


export class EditCluster extends Component {
  state = {
    cluster: this.props.cluster,
    title: this.props.cluster.title,
    description: this.props.cluster.description,
    sets: [],
    setsArray: [],
    isUpdating: true,
    isPending: true,
    isReady: false,
  };
  static propTypes = {
    cluster: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
    // subject: PropTypes.string.isRequired,
    sets: PropTypes.array.isRequired,
    addCluster: PropTypes.func.isRequired,
    updateCluster: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  //Before render, to fetch info about this list regarding subject and block
  rendering() {
    if (this.state.isUpdating == true) {
      this.setState({
        isUpdating: false,
        isPending: true,
      });
      // this.props.getSets(this.props.block, this.props.subject);
    }

    //Pending
    if (this.state.isPending == true) {
      // To give the 'sets' an isChecked field
      let newSeti;
      let newSets = [...this.props.sets];

      // for (newSeti = 0; newSeti < newSets.length; newSeti++) {
      //   newSets[newSeti] = {...newSets[newSeti], isChecked: false}
      // }
      newSets.forEach((set) => {
        if (this.props.cluster.sets.includes(set.id)) {
          set.isChecked = true;
        } else {
          set.isChecked = false;
        }
      });
      this.setState({
        sets: newSets,
        isPending: false,
      });
    }
  }
  handleCheckElement = (e) => {
    let checkedSets = this.state.sets;
    checkedSets.forEach((set) => {
      if (set.id == e.target.value) {
        set.isChecked = e.target.checked;
      }
    });
    this.setState({ sets: checkedSets });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = async (e) => {
    e.preventDefault();
    //Sets related to the cluster
    let setsArray=[];
    this.state.sets.forEach((set) => {
      if (set.isChecked) {
        setsArray.push(set.id)

      }
    });
    console.log(setsArray, "hmm")
    if (this.state.title.trim() == "") {
      this.props.createMessage({ titleEmpty: "'Title field is required" });
    } 
    if (setsArray.length == 0 ) {
      this.props.createMessage({ setsListEmpty: "Must select sets" });
    } 
    
    else if (this.state.title.trim() !== "" && setsArray.length) {
    const cluster = new FormData();
    cluster.append("title", this.state.title);
    cluster.append("description", this.state.description);
    cluster.append("setsArray", setsArray)
    setTimeout(() =>  this.props.updateCluster(cluster, this.state.cluster.id, setsArray), 300);
    setTimeout(() =>  this.props.onSave(e), 400);
    
    this.setState({
      title: "",
      description: "",

    });
    }
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.cluster.id != nextProps.cluster.id) {
      this.setState({ cluster: nextProps.cluster });
    }
  }

  render() {
    // The loading handler: isReady(For loading screen) > isUpdating(for fetching sets) > isPending (for adding 'isChecked' for sets) > Then finally loading the page
    if (this.state.isReady == false) {
      setTimeout(() => this.setState({ isReady: true }), 600);
    }
    if (this.state.isReady == true) {
      this.rendering();
    }
    const { title, description } = this.state;
    if (this.state.isPending == false) {
      this.rendering();
      return (
        <div className="container mt-5 mb-5">
        <div className="row">
        <div className="col"><h1 className="tawassamBlue pb-4 text-center">Edit Cluster</h1></div>
        </div>

          <div className="row pt-4" >
            <div className="col-6">
              <form onSubmit={this.onSubmit} id="clusterForm">
                <div className="form-group">
                  <h4 className="tawassamYellow">Title:</h4>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    onChange={this.onChange}
                    value={title}
                    placeholder="Title of the cluster"
                  />
                </div>
                <div className="form-group">
                  <h4 className="tawassamYellow mt-3">Description:</h4>
                  <textarea
                    className="form-control"
                    type="text"
                    name="description"
                    onChange={this.onChange}
                    value={description}
                    placeholder="Cluster description"
                    rows="6"
                  />
                </div>
              </form>
            </div>
            <div className="col-6">
              <h4 className="tawassamYellow">Select sets for this cluster:</h4>
              <div style={{ height: "350px", overflow: "auto" }}>
                <table className="table table-striped ">
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
                            checked={set.isChecked}
                            value={set.id}
                          />
                        </td>
                        <td className="tawassamBlue">{set.id}</td>
                        <td className="tawassamBlue">{set.title}</td>
                        <td className="tawassamBlue">{set.owner_username}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row pt-2">
            <button
              type="submit"
              form="clusterForm"
              className="btn tawassamBlueBG btn-block"
            >
              Edit
            </button>
            <button
              onClick={this.props.onSave}
              className="btn btn-secondary mt-3 btn-block"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
    if (this.state.isPending == true) {
      return (
        <Loader/>

      );
    }
  }
}

export default connect(null, { addCluster, updateCluster, createMessage })(EditCluster);
