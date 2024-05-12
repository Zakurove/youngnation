import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
import "../../../static/css/user.css";
/**
 * Register
 */
export class Register extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    name: "",
    email: "",
    password: "",
    role: null,
    password2: "",
    institution: null,
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2, role, institution } = this.state;
    // if (this.state.role !== "Instructor" && this.state.role !== "Learner" ) {
    //   this.props.createMessage({ roleNotSelected: "Please select a role" });
    // } 
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } 
    else {
      const newUser = new FormData();
      newUser.append("name", this.state.name);
      newUser.append("password", this.state.password);
      newUser.append("email", this.state.email);
      newUser.append("role", "Learner");
      newUser.append("institution", this.state.institution);

      this.props.register(newUser);
    }
  };
  yourChangeHandler(event) {
    this.setState({ institution: event.target.value });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { name, email, password, password2 } = this.state;
    return (
      <Fragment>
      <div className="container mb-5 pb-5">
      <div className="row justify-content-center mb-5">
            <div className="col-md-5 mx-auto pt-5 mb-5">
            <a href="#/welcome">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/talentmineLogo.png"
              }
              className="img-fluid"
              alt="Responsive image"
              style={{ width: "150%" }}
            />
            </a>
            
            </div>
          </div>

        <div className="row justify-content-center">
          <div className="col-lg-6">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/horseriding.jpg"

              }
              className="img-fluid float-right pe-5"
              alt="Responsive image"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-lg-6 pt-5">           
         <form onSubmit={this.onSubmit} className="mt-5 pt-5">
            <h3 className="talentmineBlue mb-3 text-center">التسجيل</h3>
                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-envelope mx-auto"></i>
                    </span>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={email}
                    placeholder="البريد الإلكتروني"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-user mx-auto"></i>
                    </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onChange}
                    value={name}
                    placeholder="الإسم الكامل"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-key mx-auto"></i>
                    </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    placeholder="كلمة المرور"
                  />
                </div>

                <div className="input-group form-group mt-3">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-key mx-auto"></i>
                    </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    onChange={this.onChange}
                    value={password2}
                    placeholder="تأكيد كلمة المرور"
                  />
                </div>



                <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg  mt-4"
                >
                  سجل
                </button>
                </div>
                <hr/>
                <div className="talentmineBlue">
                لديك حساب؟{" "}
                <Link to="/login" className="talentmineBlue" style={{fontWeight: "bold", textDecoration: "none"}}>
                  سجل الدخول
                </Link>
              </div>

              </form>
               </div>

          


        </div>
      </div>
    </Fragment>
     
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
