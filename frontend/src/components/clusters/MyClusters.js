import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getMyClusters, deleteCluster, getClusters } from "../../actions/clusters.js";
import FormCluster from "./FormCluster.js";
import DetailsCluster from "./DetailsCluster.js";

export class MyClusters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      block: this.props.block,
      // subject: this.props.subject,
      selectedClusterId: null,
      selectedCluster: null,
      username: null,
    };
    this.backToMyClusters = this.backToMyClusters.bind(this);
  }
  rendering(user) {
      
    if (user && this.state.isUpdating == true) {
        if (this.state.username !== null) {
            
      this.setState({
        isUpdating: false,
      });
    }
        this.setState({username: user.name})
      this.props.getMyClusters(user.id);
    }
  }

  static propTypes = {
    //This is the first "cluster" from the func down below
    clusters: PropTypes.array.isRequired,
    getMyClusters: PropTypes.func.isRequired,
    getClusters: PropTypes.func.isRequired,
    deleteCluster: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }
  backToMyClusters(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true});
  }
  render() {
    const { user } = this.props.auth;  
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsCluster
            selectedClusterId={this.state.selectedClusterId}
            cluster={this.state.selectedCluster}
            block={'Cardiovascular'}
            subject={"Microbiology"}
            backToList={this.backToMyClusters}
          />
        </Fragment>
      );
    }

    {
      this.rendering(user);
    }
    return (
      <div className="container">
        <h1 className="text-center py-2 tawassamBlue">
          {this.state.username +"'s"} Clusters
        </h1>
        <p></p>
        <table className="table table-striped">
          <thead>
            <tr>
            <th><span className="tawassamYellow">ID</span></th>
                <th><span className="tawassamYellow">Title</span></th>
                <th><span className="tawassamYellow">Block</span></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.clusters.map((cluster) => (
              <tr key={cluster.id}>
                  <td className="tawassamBlue">{cluster.id}</td>
                  <td className="tawassamBlue"> {cluster.title}</td>
                  <td className="tawassamBlue"> {cluster.block}</td>

                <td>
                  <a
                    href= {`#/myclusters/${cluster.id}`}
                    className="btn tawassamYellowBG"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  clusters: state.clusters.clusters,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMyClusters, deleteCluster, getClusters })(MyClusters);