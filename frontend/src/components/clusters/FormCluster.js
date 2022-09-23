import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form } from "react-bootstrap";
import { addCluster } from '../../actions/clusters.js';
import { getBlockSets } from '../../actions/sets.js';
import { createMessage } from "../../actions/messages";
import Loader from "../layout/Loader.js";
 export class FormCluster extends Component {
   
   state = {
     title: '',
     description: '',
     block: this.props.block,
     subject: null,
     sets: [],
     setsArray: [],
     isUpdating: true,
     isPending: true,
     isReady: false,
     getSets: true,
     call: true
     
   }

   

       //Before render, to fetch info about this list regarding  block
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
        isPending: true
      });
      // this.props.getBlockSets(this.state.block);
    }

    //Pending 
    if (this.state.isPending == true) {
      // To give the 'sets' an isChecked field
      let newSeti;
      let newSets = [...this.props.sets]
      for (newSeti = 0; newSeti < newSets.length; newSeti++) {
        newSets[newSeti] = {...newSets[newSeti], isChecked: false}
      }
      this.setState ({
        sets: newSets,
        isPending: false
      })
    }
    
  }

  static propTypes = {
    sets: PropTypes.array.isRequired,
    getBlockSets: PropTypes.func.isRequired,
    addCluster: PropTypes.func.isRequired,
    block: PropTypes.string.isRequired,
    // subject: PropTypes.string.isRequired,
    backToList: PropTypes.func.isRequired,
  };

  // this.handleCheckElement = this.handleCheckElement.bind(this);
  handleCheckElement = (e) => {
    let checkedSets = this.state.sets
    checkedSets.forEach(set => {
      if (set.id == e.target.value) {
        set.isChecked =  e.target.checked
      }
      })
    this.setState({sets: checkedSets})
 }
     onChange = e => this.setState ({ [e.target.name]: e.target.value });



     onSubmit = (e) => {
       e.preventDefault();
      
      //Sets related to the cluster
      let setsArray=[];
       this.state.sets.forEach(set => {
        if (set.isChecked) {
          let id = set.id
          setsArray.push(set.id)
        //   this.setsArray.setState(previousState => ({
        //     setsArray: [...previousState.setsArray, id ]
        // }));
        }
       })
       if (this.state.title.trim() == "") {
        this.props.createMessage({ titleEmpty: "'Title field is required" });
      } 
      if (setsArray == 0 ) {
        this.props.createMessage({ setsListEmpty: "Must select sets" });
      } 
      else if (this.state.title.trim() !== "" && setsArray.length ) {
       const cluster = new FormData();
       cluster.append('title', this.state.title)
       cluster.append('description', this.state.description);
       setTimeout(() => cluster.append('setsArray', setsArray), 300);
       cluster.append('block', this.props.block);
      //  cluster.append('subject', this.props.subject);
      //  this.props.addCluster(cluster);
       setTimeout(() => this.props.addCluster(cluster), 500);
       this.setState({
         title: "",
         description: "",
       })
       
      //  Go to associate sets
      setTimeout(() => this.props.backToList(), 700);
       
      }
     };
     componentDidMount() {
      // this.props.getBlockSets(this.props.block);

    }
     render() {
      
      // The loading handler: isReady(For loading screen) > isUpdating(for fetching sets) > isPending (for adding 'isChecked' for sets) > Then finally loading the page
        // The loading handler
        if (this.state.isReady == false) {
          if (this.state.call == true) {  
            if (this.state.getSets == true) {  
              this.props.getBlockSets(this.props.block);
            this.setState({ getSets: false })
            }
            if (this.props.sets.length > 0) {
              this.setState({ call: false, isPending: true })
            }
        }
          //Pending 
    if (this.state.isPending == true) {
      // To give the 'sets' an isChecked field
      let newSeti;
      let newSets = [...this.props.sets]
      for (newSeti = 0; newSeti < newSets.length; newSeti++) {
        newSets[newSeti] = {...newSets[newSeti], isChecked: false}
      }
      this.setState ({
        sets: newSets,
        isPending: false
      })
    }
        if (this.state.call == false && this.state.isPending == false) {
          setTimeout(() => this.setState({ isReady: true }), 500);
          }
      }
      if (this.state.isReady == false) {
        return (
          <Loader/>
          );
        }
    if (this.state.isReady == true) {
      this.rendering(); 
    }
       const {title, description } = this.state;
       if (this.state.isPending == false) {
        this.rendering(); 
        return (
         <div className="container">
           <h1 className="text-center py-2 tawassamBlue">{this.props.block}: create a cluster</h1>
           <Button
          className="btn btn-secondary mb-2"
          onClick={this.props.backToList}
          
        >
         <i class="fas fa-arrow-left"></i> Previous Page
        </Button>
          <hr/>
          <div className="row pt-4">
            
            <div className="col-6">
            <form onSubmit={ this.onSubmit} id="clusterForm">
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
            <div className="col-6" >
            <h4 className="tawassamYellow">Select sets for this cluster:</h4>
            <div style={{ height: "350px", overflow: "auto" }} className="style-1">
            <table className="table table-striped " > 
            <thead>
              <tr>
                <th></th>
                <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Title</span></th>
                <th ><span className="tawassamYellow">Owner</span></th>
                 </tr>
            </thead>
            <tbody>
              {this.state.sets.map((set) => (
                <tr key={set.id}>
                  <td className="tawassamBlue"><input key={set.id} onChange={ (e) => this.handleCheckElement(e) }  type="checkbox" checked={set.isChecked} value={set.id}   /></td>
                  <td className="tawassamBlue">{set.id}</td>
                  <td className="tawassamBlue">{set.title}</td>
                  <td className="tawassamBlue"> {set.owner_username}</td>
                  

                  {/* <td>
                    <a
                      href={`#/${this.state.blockLink}/${this.state.subjectLink}/${cluster.id}`}
                      className="btn btn-warning"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={(e) => {
                        this.setState({
                          selectedClusterId: cluster.id,
                          // isViewing: true,
                          selectedCluster: cluster,
                        });
                      }}
                    >
                      View Cluster
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
             </div>
            </div>
          </div>
          <div className="row pt-4">     
              {/* <div className="form-group"> */}
              <div className="d-grid">
              <button type="submit" form="clusterForm" className="btn tawassamBlueBG mb-5">
                Create This Cluster
              </button>
              </div>
            {/* </div> */}
            </div>
          </div>
       )
        }
        if (this.state.isPending == true) {
          return (
      
          <Loader/>

      
          );
          }
     }
   }

   const mapStateToProps = (state) => ({
    // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
    sets: state.sets.sets,
    // auth: state.auth,
    // loadingState: state.loadingState,
  });
  // export default connect(null, { addCluster })(FormCluster);
  export default connect(mapStateToProps, { getBlockSets, addCluster, createMessage })(FormCluster);
