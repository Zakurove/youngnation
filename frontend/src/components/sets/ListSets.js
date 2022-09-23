import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getBlockSets, deleteSet } from "../../actions/sets.js";
// import { loadingOn, loadingOff } from "../../actions/loading.js";
import FormSet from "./FormSet.js";
import DetailsSet from "./DetailsSet.js";
import Loader from "../layout/Loader.js";

export class ListSets extends Component {
  static propTypes = {
    goCluster: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isReady: false,
      isViewing: false,
      block: this.props.block,
      selectedView: this.props.block,
      subject: null,
      selectedSetId: null,
      selectedSet: null,
      blockLink: null,
      subjectLink: null,
      sets: this.props.sets,
      getSets: true,
      call: true,
    };
    this.backToList = this.backToList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value, selectedView: event.target.value});
    if (event.target.value == this.props.block) {
      this.setState({sets: this.props.sets})
    } else {
      this.setState({subject:event.target.value,  sets: this.props.sets.filter((set) =>  set.subject == event.target.value )})
    }
  }
  //Before render, to fetch info about this list regarding subject and block
  rendering() {
    if (this.state.isUpdating == true) {
      // this.props.getBlockSets(this.state.block);

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
      if (this.props.sets){
      this.setState({
        isUpdating: false,
      });
    }

    }

    this.backToList = this.backToList.bind(this);
  }

  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getBlockSets: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    block: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // this.props.getBlockSets(this.props.block);
    // this.setState({sets: this.props.sets})
  }
  backToList(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true, isReady: false, call: true, getSets: true });
  }
  render() {

    if (this.state.isCreating) {
      return (
        <Fragment>
          <FormSet
            block={this.state.block}
            subject={this.state.subject}
            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsSet
            selectedSetId={this.state.selectedSetId}
            set={this.state.selectedSet}
            block={this.state.block}
            subject={this.state.subject}
            backToList={this.backToList}
          />
        </Fragment>
      );
    }
    const { user } = this.props.auth;
    {
      this.rendering();
    }

    // // The loading handler
    // if (this.state.isReady == false) {
    //   // setTimeout(() => this.props.getBlockSets(this.props.block), 1000);

    //   if ( this.state.selectedView == this.props.block) {
    //     setTimeout(() => this.setState({ isReady: true, sets: this.props.sets }), 1500);
    //   } else {
    //     setTimeout(() => this.setState({ isReady: true, subject: this.state.selectedView,  sets: this.props.sets.filter((set) =>  set.subject == this.state.selectedView )}), 1500);
    //   }

    // }
        // The loading handler
        if (this.state.isReady == false) {
          //Call the sets
          if (this.state.call == true) {  

            if (this.state.getSets == true) {  
            this.props.getBlockSets(this.props.block);
            //So we call the sets only once
            this.setState({ getSets: false })
            }
            if (this.props.sets.length > 0 && this.props.sets[0].block == this.props.block) {
              this.setState({ sets: this.props.sets })
              this.setState({ call: false })
            }
        } 
        //Load anyways after 10sec if there's no Sets
          setTimeout(() => this.setState({ call: false }), 10000);
        //After having the sets
        if (this.state.call == false) {       
          if ( this.state.selectedView == this.props.block) {
            setTimeout(() => this.setState({ sets: this.props.sets }), 500);
            setTimeout(() => this.setState({ isReady: true }), 1000);
          } else {
            setTimeout(() => this.setState({ isReady: true, subject: this.state.selectedView, sets: this.props.sets.filter((set) =>  set.subject == this.state.selectedView )}), 1000);
          }
        }
      }

    //The List component
    if (this.state.isReady) {
      return (
        <div className="container my-5">
                  <div id="cards_landscape_wrap-2" className="mb-5">
          <h1 className="text-center mb-4 tawassamBlue" style={{fontSize: "3rem"}}>
          {this.state.block} Sets
        </h1>
        
            {/* DropList */}
            <div className="mx-auto px-3" >
        <select className="form-select form-select-lg text-center" value={this.state.selectedView} onChange={this.handleChange}>
          <option value={this.state.block} selected>All</option>
          <option value="Microbiology">Microbiology </option>
          <option value="Imaging">Imaging</option>
          <option value="Pathology">Pathology</option>
          <option value="Histology">Histology</option>
          <option value="Cytology">Cytology</option>
          <option value="Clinical">Clinical</option>
        </select>
        </div>
        

                {/* Subjects and blocks */}
                <div className="row mb-4 mt-5 d-flex justify-content-center">
        { this.state.selectedView == "Cardiovascular" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/CardioTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
        )}
        { this.state.selectedView == "Musculoskeletal" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/MSKTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
        )}
{ this.state.selectedView == "Respiratory" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/RespTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
)}
{ this.state.selectedView == "Hematology/Oncology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/HemOncTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
)}
{ this.state.selectedView == "Neurology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/NeuroTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
)}
{ this.state.selectedView == "Endocrine" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/EndoTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
)}
{ this.state.selectedView == "Gastrointestinal" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
            src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GastroTawassam3.jpg"
            alt="Responsive image"
            className="img-fluid"
            style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
          />
          </div>
)}
{this.state.selectedView == "Genitourinary" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                  <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/Blocks/GenitoTawassam3.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
              </div>
)}
{this.state.selectedView == "Microbiology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/micro.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
    </div>
)}
{this.state.selectedView == "Imaging" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/imaging.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
    </div>
)}
{this.state.selectedView == "Pathology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/patho.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
    </div>
)}
{this.state.selectedView == "Histology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/histo.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
    </div>
)}
{this.state.selectedView == "Cytology" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
              <img
                src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/cyto.jpg"
                alt="Responsive image"
                className="img-fluid"
                style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
              />
    </div>
)}
{this.state.selectedView == "Clinical" && (
              <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                        <img
                          src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/clinical.jpg"
                          alt="Responsive image"
                          className="img-fluid"
                          style={{borderRadius: "3rem", border: "4px solid #00D0C5",}}
                        />
              </div>
)}
            </div>




        </div>
          <Button
            className="btn btn-secondary mb-1 "
            href={`#/`}
          >
           <i class="fas fa-arrow-left"></i> Previous Page
          </Button>
          {user
            ? this.props.auth.user.role &&
              this.props.auth.user.role == "Educator" && this.state.selectedView !== this.props.block && (
                <Button
                variant="info"
                  className="btn btn-info tawassamBlueBG  ms-3 mb-1"
                  onClick={(e) => {
                    this.setState({
                      isCreating: true,
                    });
                  }}
                >
                  Add a New Set
                </Button>
              )
            : ""}
          {/* <Button
            className="btn btn-warning ms-3 mb-1 "
            href={`#/${this.state.blockLink}/practice`}
            style={{fontSize: "1.2rem"}}
          >
           <i className="fas fa-keyboard" style={{fontSize: "1.3rem"}}></i> Practice Block
          </Button> */}

          <Button
            className="btn btn-info tawassamBlueBG float-end mt-1 "
            href={`#/${this.state.blockLink}/clusters`}
            style={{fontSize: "1.2rem"}}

          >
           <i className="fas fa-sitemap " style={{ fontSize: "1.3rem" }}></i> Clusters
          </Button>

          <hr />
          <p></p>
          <div style={{ maxHeight: "600px", overflow: "auto"}} className="mb-5">
          <table className="table table-striped mx-2">
            <thead>
              <tr>
                <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Title</span></th>
                <th ><span className="tawassamYellow">Subject</span></th>
                <th ><span className="tawassamYellow">Owner</span></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.sets.map((set) => (
                <tr key={set.id}>
                  <td className="" style={{color: "#10a1b6"}}>{set.id}</td>
                  <td className="" style={{color: "#10a1b6"}}>{set.title}</td>
                  <td className="" style={{color: "#10a1b6"}}>{set.subject}</td>
                  <td className="" style={{color: "#10a1b6"}}>{set.owner_username}</td>
                  <td>
                    <a
                      href={`#/${this.state.blockLink}/sets/${set.id}`}
                      className="btn tawassamYellowBG"
                      style={{ whiteSpace: "nowrap" }}
                      onClick={(e) => {
                        this.setState({
                          selectedSetId: set.id,
                          // isViewing: true,
                          selectedSet: set,
                        });
                      }}
                    >
                      View Set
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      );
    }
    // The loading component
    if (this.state.isReady == false) {
    return (

    <Loader/>

    );
    }
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
  auth: state.auth,
  loadingState: state.loadingState,
});

export default connect(mapStateToProps, { getBlockSets, deleteSet })(ListSets);
