import React, { Component, Fragment } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";


export class Soon extends Component {
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


  render() {
    return (
      <div className="container mt-4 mb-5">
        <h1 className="talentminePurple text-center mt-5"> لقد اتخذت أول خطوة بالاختبار المبدأي , نمي موهبة ومهارات طفلك وزرونا في الأكاديمية للتحليل الشامل والخطة التطويرية</h1>
        <div className="justify-content-center row mt-5">
        <img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/trainers.jpg" style={{width: "70%"}} class="img-fluid ps-2 text-center" />
        </div>
        <h1 className="text-center  my-3 mb-5 pb-5 talentmineBlue" style={{fontSize: "4rem",color: "#FFC144", fontWeight: "bold"}} > قريبا... </h1>
      </div>
    );
  }
}

export default Soon;
