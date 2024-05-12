import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "../../../static/css/user.css";
/**
 * Login
 */
export class Login extends Component {
  // eslint-disable-line react/prefer-stateless-function
  state = {
    email: "",
    password: "",
    isChecked: false,
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    if (localStorage.checkbox && localStorage.email !== "") {
        this.setState({
            isChecked: true,
            email: localStorage.email,
            password: localStorage.password
        })
    }
}

onChangeValue = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

onChangeCheckbox = event => {
  this.setState({
      isChecked: event.target.checked
  })
}

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  loginSubmit = () => {
    const { email, password, isChecked } = this.state
    if (isChecked && email !== "") {
        localStorage.email = email
        localStorage.password = password
        localStorage.checkbox = isChecked
    }
    this.props.login(this.state.email, this.state.password);
}


  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { email, password, isChecked } = this.state;
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

        <div className="row">
          <div className="col-lg-7">
            <img
              src={
                "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/tennis.jpg"

              }
              className="img-fluid float-right"
              alt="Responsive image"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-lg-5">
          <div className="row">
            <div className=" mx-auto">
              <form className="mt-5">
                <h3 className="talentmineBlue mb-3 ps-5">تسجيل الدخول</h3>

                <div className="input-group form-group mt-4">
                    <span className="input-group-text iconInput ">
                      <i className="fas fa-envelope mx-auto"></i>
                    </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChangeValue}
                    value={email}
                    placeholder="البريد الإلكتروني"
                  />
                </div>

                <div className="input-group form-group mt-4">

                    <span className="input-group-text iconInput">
                      <i className="fas fa-key mx-auto"></i>
                    </span>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.onChangeValue}
                    value={password}
                    placeholder="كلمة المرور"
                  />
                </div>

                <div className="form-group pt-2">
                  <div className="custom-control custom-checkbox mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input me-2 "
                      checked={isChecked}
                      onChange={this.onChangeCheckbox}
                      name="lsRememberMe"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label talentmineBlue"
                      htmlFor="customCheck1"
                    >
                      تذكرني
                    </label>
                  </div>
                </div>
                <div className="d-grid">
                <button
                  type="button"
                  value="Login"
                  onClick={this.loginSubmit}
                  className="btn btn-dark btn-lg mt-4"
                >
                  سجل الدخول
                </button>
                </div>
                <hr/>
                <div className="talentmineBlue">
                   ليس لديك حساب؟
                 <Link to="/register" className="talentmineBlue" style={{fontWeight: "bold", textDecoration: "none"}}>
                   سجل  
                </Link>
              </div>
              </form>
            </div>
            
          </div>
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

export default connect(mapStateToProps, { login })(Login);
