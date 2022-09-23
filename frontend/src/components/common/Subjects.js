import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";


export class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: null,
      block: null,
      isUpdating: true
    };
  }
  static propTypes = {
    block: PropTypes.string.isRequired,
  };

  rendering() {
    if (this.state.isUpdating == true) {
      if (this.props.block == 'Hematology/Oncology') {
        this.setState({
          block: 'hemOnc',
        });
      }
      if (this.props.block !== 'Hematology/Oncology') {
        const blockLink = this.props.block.toLowerCase()
        this.setState({
          block: blockLink,
        });
      }
      this.setState({
        isUpdating: false,
      });
    }
  }

  componentDidMount() {

  }
  render() {
    {
      this.rendering();
    }
    return (
      <div id="cards_landscape_wrap-2">
        <h1 className="text-center"></h1>

        <div className="container pt-4 ">
          <h1 className="text-center tawassamBlue" >{this.props.block} Block</h1>
          {/* <hr/> */}
          <div className="d-flex justify-content-start mt-2" >
          <Button
            className="btn btn-secondary mb-1 "
            href="/#"
          >
           <i class="fas fa-arrow-left"></i> Previous Page
          </Button>
          <Button
            className="btn btn-warning ms-3 mb-1 "
            href={`#/${this.state.block}/practice`}
            style={{fontSize: "1.2rem"}}
          >
           <i className="fas fa-keyboard" style={{fontSize: "1.3rem"}}></i> Practice Block
          </Button>

          </div>


          <div className="row pt-2" >

          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4" >
                    <a href={`#/${this.state.block}/microbiology`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/micro.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Microbiology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href={`#/${this.state.block}/imaging`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/imaging.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Imaging</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href={`#/${this.state.block}/pathology`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/patho.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Pathology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>


                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href={`#/${this.state.block}/histology`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/histo.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Histology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href={`#/${this.state.block}/cytology`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/cyto.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Cytology</h6> 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-xs-12 col-sm-6 col-md-3 col-lg-4">
                    <a href={`#/${this.state.block}/clinical`}>
                        <div class="card-flyer mt-1 mb-5">
                            <div class="text-box">
                                <div class="image-boxSubjects">
                                    <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/clinical.jpg" alt="" />
                                </div>
                                <div class="text-container">                                    
                                    <h6>Clinical</h6> 
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

export default Subjects;
