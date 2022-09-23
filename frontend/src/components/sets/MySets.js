import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getMySets, deleteSet, getSets } from "../../actions/sets.js";
import FormSet from "./FormSet.js";
import DetailsSet from "./DetailsSet.js";

export class MySets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      isCreating: false,
      isViewing: false,
      block: this.props.block,
      subject: this.props.subject,
      selectedSetId: null,
      selectedSet: null,
      username: null,
    };
    this.backToMySets = this.backToMySets.bind(this);
  }
  rendering(user) {
      
    if (user && this.state.isUpdating == true) {
        if (this.state.username !== null) {
            
      this.setState({
        isUpdating: false,
      });
    }
        this.setState({username: user.name})
      this.props.getMySets(user.id);
    }
  }

  static propTypes = {
    //This is the first "set" from the func down below
    sets: PropTypes.array.isRequired,
    getMySets: PropTypes.func.isRequired,
    getSets: PropTypes.func.isRequired,
    deleteSet: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {

  }
  backToMySets(event) {
    this.setState({ isCreating: false, isViewing: false, isUpdating: true});
  }
  render() {
    const { user } = this.props.auth;  
    if (this.state.isViewing) {
      return (
        <Fragment>
          <DetailsSet
            selectedSetId={this.state.selectedSetId}
            set={this.state.selectedSet}
            block={'Cardiovascular'}
            subject={"Microbiology"}
            backToList={this.backToMySets}
          />
        </Fragment>
      );
    }

    {
      this.rendering(user);
    }
    return (
      <div className="container my-5">
        <h1 className="text-center py-2 tawassamBlue">
          {this.state.username +"'s"} Sets
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
            {this.props.sets.map((set) => (
              <tr key={set.id}>
                  <td className="tawassamBlue">{set.id}</td>
                  <td className="tawassamBlue">{set.title}</td>
                  <td className="tawassamBlue">{set.block}</td>

                <td>
                  <a
                    href= {`#/mysets/${set.id}`}
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
    );
  }
}

const mapStateToProps = (state) => ({
  // the first one is whatever we're getting so it's okay, the 2nd one is the name of the reducer, the 3rd the state in the reducer
  sets: state.sets.sets,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMySets, deleteSet, getSets })(MySets);