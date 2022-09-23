import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const renderTooltip1 = (props) => (
      <Tooltip id="button-tooltip1" style={{fontSize: "2rem", maxWidth: "200%"}} {...props}>
        Logout
      </Tooltip>
    );
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Navbar.Collapse className="justify-content-end ms-2">

        <Navbar.Text style={{fontSize: "1.5rem"}} className=" ms-2">
        <i className="fas fa-user talentminePurple"></i> {user ? <span className="talentmineBlue" style={{fontWeight: "bold"}}> {user.name} </span> : ""}
          </Navbar.Text>
        

          <Nav>
        <Nav.Link onClick={this.props.logout} style={{fontSize: "2rem"}} className="ms-3 me-3 talentminePurple">               
        <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip1}
              >
                <i className="fas fa-sign-out-alt"></i>
              </OverlayTrigger></Nav.Link>
        </Nav>

      </Navbar.Collapse>
    );

    const guestLinks = (
          <Navbar.Collapse className="justify-content-end ms-2">
            <Nav>
            <Nav.Link href="#/login" style={{fontSize: "2rem"}} className="me-3"><i className="fas fa-sign-in-alt talentminePurple mx-1"></i> الدخول </Nav.Link>  
            <Nav.Link href="#/register" className="me-3" style={{fontSize: "2rem"}}><i className="fas fa-user-plus talentminePurple mx-1" style={{fontSize: "1.5rem"}}></i> التسجيل </Nav.Link>
            
            
            </Nav>
          </Navbar.Collapse>
    );

    return (
      <div className="">
      <Navbar  bg="light" expand="lg" className="">
      <Navbar.Brand href="/#" style={{fontSize: "2.5rem"}} className="d-inline-block align-top ps-2"><img src={
                  "https://tawassam.ams3.digitaloceanspaces.com/Test1/media/talentmineLogo.png"
                } style={{width: "160px"}} /></Navbar.Brand> 
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="mt-2">
      <Nav className="me-auto ms-2" style={{fontSize: "2rem"}}>
      <Nav.Link href="/#" className="me-5 ms-2"><i className="fas fa-home talentminePurple mx-1"></i> <span>الصفحة الرئيسية </span></Nav.Link>
      <Nav.Link href="#/soon" className="me-5 ms-2"><i className="fas fa-info-circle talentminePurple mx-1"></i> <span>تعرف أكثر </span></Nav.Link>
      {user
        ? this.props.auth.user.role && this.props.auth.user.role == "Educator" && (
          <Nav.Link href="#/mysets" className="ms-4"><i className="fas fa-layer-group talentminePurple"></i> My Sets</Nav.Link>
          )
        : "" }
              {user
        ? this.props.auth.user.role && this.props.auth.user.role == "Educator" && (
          <Nav.Link href="#/myclusters" className="ms-4"><i className="fas fa-sitemap talentminePurple"></i> My Clusters</Nav.Link>
          )
        : "" }
  
      </Nav>
      {isAuthenticated ? authLinks : guestLinks} 

      </Navbar.Collapse>
    </Navbar>

    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
