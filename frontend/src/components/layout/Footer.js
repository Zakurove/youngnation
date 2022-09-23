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
                  className="tw-ic talentminePurple pl-4 ms-2"
                  href="https://twitter.com/Talentmine"
                >
                  <i className="fab fa-twitter  me-md-5 me-3 fa-2x">
                    {" "}
                  </i>
                </a>

                <a
                  className="tw-ic talentminePurple"
                  href="mailto:talentmine@gmail.com"
                >
                  <i className="far fa-envelope me-md-5 me-3 fa-2x">
                    {" "}
                  </i>
                </a>
              </div>
            </div>
          </div>
          

          <div className="footer-copyright text-center py-3 talentminePurple text-decoration-none" style={{fontWeight: "bold"}}>
          2022 Copyright:©
          <s href="mailto:tawassam.med@gmail.com"className="text-decoration-none talentmineBlue" style={{fontWeight: "bold"}}>
            {" "}
            Talentmine
          </s>
        </div>
        </div>


      </footer>

    );
  }
}

export default Footer;

