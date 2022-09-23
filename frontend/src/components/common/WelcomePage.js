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
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }

    const { email, currentBlock } = this.state;
    return (
      <div className=" justify-content-around" 
      // style={{backgroundImage: `url("https://tawassam.ams3.digitaloceanspaces.com/Test1/media/WelcomePageCropped.png")`, backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "right top"  }}
      >                          
        <div className="row justify-content-center">
          <div className="col-xl-5   col-lg-5 col-md-12 col-xs-12 col-sm-12 mb-5 pe-5 p-2" style={{marginTop: "6rem"}}>
            <div className="row justify-content-center mb-5"><img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/TalentmineStar.png" style={{width: "30%"}} class="img-fluid ps-2" /></div>
          
          <h1 style={{fontSize: "3.0rem"}} className="me-2 p-3 text-center">إكتشف وطور موهبتك الرياضية</h1>
          <h3 className="me-5 p-3 text-center">في تالنت-ماين نساعدك على إكتشاف في أي رياضة تكمن موهبتك بناء على تحليل قياساتك, خبراتك وتفضيلاتك بإستخدام الذكاء الاصطناعي.</h3>

          <div className="mt-4 pt-5 justify-content-center text-center px-3">
          <Link to="/session/create">
            <button type="button" className="btn btn-info btn-lg talentminePurpleBG" style={{padding: "0.7rem 1.5rem", fontSize: "3rem", borderRadius: "2.9rem", borderColor:"#523b93"}}> نَقّب عن موهبتك</button>
            </Link>
          </div>

          


        </div>
        <div className="col-xl-4 col-lg-4 col-md-8 mt-5"><img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/TalentmineBall.png" style={{width: "100%"}} class="img-fluid ps-2 pt-5 mt-5" /></div>
        </div>
        <div className="row mb-5" style={{marginTop: "5rem"}}>
        {/* <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mt-5 pt-5 align-self-center">
          <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/SubjectsList.png" class="img-fluid ps-2" />
        </div>
        <div className=" col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 align-self-center p-4">
        <h1 style={{fontSize: "3rem"}} className=""><span className="tawassamBlue">Study</span> different subject and <span className="">ACE your exams!</span></h1>
          <h4><span className="tawassamBlue">Explore</span> our library and <span className="tawassamYellow">practice</span> various subjects in all systems.</h4>
        </div> */}



        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addEmailList, createMessage })(WelcomePage);
