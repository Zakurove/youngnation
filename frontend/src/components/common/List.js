import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ListSets from "../sets/ListSets";
import ListClusters from "../clusters/ListClusters";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
export class List extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    
    this.state = {
      isSet: false,
      isCluster: false,
      blockLink: "",
      isUpdating: true,
    };
    this.goSet = this.goSet.bind(this);
    this.goCluster = this.goCluster.bind(this);
  }

  goSet(event) {
    this.setState({ isSet: true, isCluster: false });
  }
  goCluster(event) {
    this.setState({ isSet: false, isCluster: true });
  }
  render() {
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

    }
    // if (this.state.isSet) {
    //   return (
    //     <Fragment>
    //       <ListSets
    //         block={this.props.block}
    //         subject={this.props.subject}
    //         goCluster={this.goCluster}
    //       />
    //     </Fragment>
    //   );
    // }
    // if (this.state.isCluster) {
    //   return (
    //     <Fragment>
    //       <ListClusters
    //         block={this.props.block}
    //         subject={this.props.subject}
    //         goCluster={this.goCluster}
    //         goSet={this.goSet}
    //       />
    //     </Fragment>
    //   );
    // }

    return (
      <div id="cards_landscape_wrap-2">
        <h1 className="text-center"></h1>

        <div className="container pt-4">
          <h1 className="text-center tawassamBlue">
            {this.props.block}
          </h1>

          <div className="row d-flex justify-content-around mt-2 pt-2 px-5 mb-5">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5">
              <div className="d-flex justify-content-start mb-3">
                <Button
                  className="btn btn-secondary"
                  href={`/#/`}
                >
                  <i class="fas fa-arrow-left"></i> Previous Page
                </Button>
              </div>
              <a
                href={`#/${this.state.blockLink}/sets`}
              >
                <div class="card-flyer mt-1 mb-5">
                  <div class="text-box">
                    <div class="image-boxSubjects justify-content-center d-flex p-5">
                      <i className="fas fa-layer-group mb-2 tawassamBlue" />
                    </div>
                    <div class="text-container">
                      <h6>Sets</h6>
                      <p className=" mt-2 mb-2" style={{fontSize: "1.3rem",color: "#10a1b6"}}>Specialized collection of materials that focus on one specific feature.</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5">
              <a
                href={`#/${this.state.blockLink}/clusters`}
                
              >
                <div class="card-flyer mt-1 mb-5" id="cluster-list">
                  <div class="text-box">
                    <div class="image-boxSubjects justify-content-center d-flex p-5">
                      <i className="fas fa-sitemap mb-2 tawassamBlue" />
                    </div>
                    <div class="text-container">
                      <h6>Clusters</h6>
                      <p className="mt-2 mb-2" style={{fontSize: "1.3rem", color: "#10a1b6"}}>Group of related sets joining under one general umbrella.</p>
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
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(List);
