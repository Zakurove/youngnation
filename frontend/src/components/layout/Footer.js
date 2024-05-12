import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <footer className="footer py-3" style={{backgroundColor: "rgb(233, 238, 247)"}}>
        <div className="container">
          <div className="row">
            <div className="d-block mx-auto pt-1">
              <div className="my-2 flex-center">

                <a
                  className="tw-ic talentminePurple"
                  href="mailto:contact@young-nation.com"
                >
                  <i className="far fa-envelope me-md-5 me-3 fa-2x">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div>
          

          <div className="footer-copyright text-center py-3 talentminePurple text-decoration-none" style={{fontWeight: "bold"}}>
          2024 Copyright:©
          <s href="mailto:contact@young-nation.com"className="text-decoration-none talentmineBlue" style={{fontWeight: "bold"}}>
            {" "}
            Young Nation Academy
          </s>
        </div>
        </div>


      </footer>

    );
  }
}

export default Footer;

