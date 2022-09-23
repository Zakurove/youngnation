import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEmailList } from "../../actions/emailLists";
import { createMessage } from "../../actions/messages";
import "../../../static/css/user.css";

export class WelcomePage extends Component {
  state = {
    email: "",
    currentBlock: "",
    isChecked: false,
    submitted: false
  };

  static propTypes = {
    addEmailList: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };



  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.email.trim() == "") {
      this.props.createMessage({ titleEmpty: "Please fill in the email" });
    } 
    else if (this.state.email.trim() !== "") {
    const email = new FormData();
    email.append('email', this.state.email)
    email.append('currentBlock', this.state.currentBlock);
    this.props.addEmailList(email);
    this.setState({submitted: true})
  };
}

//   emailSubmit = () => {
//     this.props.addEmailList(emailList);
// }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { email, currentBlock } = this.state;
    return (
      <div className="container bg-light justify-content-start mb-5">                          
        <div className="row mt-5 mb-5">
          <div className="col-8 mb-5">
          <h1 style={{fontSize: "5.5rem"}}><span className="tawassamBlue">Visualize</span> for a better <span className="">tomorrow!</span></h1>
          <h3>An interactive educational platform for healthcare<span className="tawassamBlue"> visual material</span> <span className="tawassamYellow">interpretation</span>.</h3>

          <div className="mt-5 pt-3 justify-content-center text-center">
          <Link to="/register">
            <button type="button" className="btn btn-info btn-lg tawassamBlueBG" style={{padding: "0.7rem 1.5rem", fontSize: "3rem", borderRadius: "2.9rem", borderColor:"#00D0C5"}}>Start Now for Free!</button>
            </Link>
          </div>

          


        </div>
        </div>
        <div className="row mt-5">
        <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-5 pt-5">
        <h1 style={{fontSize: "3rem"}} className="mt-5 pt-5"><span className="tawassamBlue">Study</span> different subject and <span className="">ACE your exams!</span></h1>
          <h4><span className="tawassamBlue">Explore</span> our library and <span className="tawassamYellow">practice</span> various subjects in all systems.</h4>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/SubjectsListCropped.png" class="img-fluid p-5" />
        </div>


        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addEmailList, createMessage })(WelcomePage);
