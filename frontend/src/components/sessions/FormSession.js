import React, { Component, Fragment} from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import * as sessionActions from "../../actions/sessions.js";
import { createMessage } from "../../actions/messages";
import Loader from "../layout/Loader.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';

 export class FormSession extends Component {
   state = {
     isReady: false,
     age: '',
     armL: '',
     height: '',
     legL: '',
     chestG: '',
     features: [{featureTitle: "Hello this is the first feature", featureDescription: "this is the description"}]
   }
     static propTypes = {
      actions: PropTypes.object.isRequired,
      auth: PropTypes.object.isRequired,
     };

     onChange = e => this.setState ({ [e.target.name]: e.target.value });



     onSubmit = (e) => {
       e.preventDefault();
       if (this.state.age.trim() == "" || this.state.armL.trim() == "" || this.state.legL.trim() == "" || this.state.chestG.trim() == "" || this.state.height.trim() == "" || this.state.weight.trim() == "") {
        this.props.createMessage({ titleEmpty: "الرجاء تعبئة جميع الحقول" });
      } 
      
      else if (this.state.age.trim() !== "" && this.state.armL.trim() !== "" && this.state.legL.trim() !== "" && this.state.chestG.trim() !== "" && this.state.height.trim() !== "" && this.state.weight.trim() !== "") {
       const set = new FormData();
       set.append('age', this.state.age)
       set.append('armL', this.state.armL);
       set.append('legL', this.state.legL);
       set.append('chestG', this.state.chestG);
       set.append('height', this.state.height);
       set.append('weight', this.state.weight);
       this.props.actions.addSession(set);
       this.setState({
         title: "",
         description: "",
         highYield: "",
         references: "",       })
        //  console.log("state", this.state.sessions)
        //  console.log("props" , this.props.sessions)
        //  console.log("hmmm" , this.state)

         let sessionsNum = this.props.sessions.length + 1
         window.location.href = `#/session/${sessionsNum}`;
        // window.location.href = `#/`;
        // window.location.href = "http://www.stackoverflow.com";

     };
     
    }
     render() {
       const {age, height, weight, armL, legL, chestG } = this.state;

                      // The loading handler
                      if (this.state.isReady == false) {
                        this.props.actions.getAllSessions();
                        setTimeout(() => this.setState({ isReady: true }), 500);
                      }       
                  
                  // The loading component
      if (this.state.isReady == false) {
        return (
        <Loader/>
        );
        }
       return (
         <div className="container mb-5 mt-5" >
           <h2 className="text-center py-2" style={{color: "#FFC144", fontWeight: "bold"}}> ❞الجميع لديهم موهبة خاصة ومن واجبنا ان نعثر عليها❝</h2>
           <Link to="/">
            <button type="button" className="btn btn-secondary mb-2"> <i class="fas fa-arrow-right"></i> العودة </button>
            </Link>
        <hr/>
          <div className="row justify-content-around pt-4 mb-2" >
            
          <div className="col-xl-4 col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <form onSubmit={ this.onSubmit} id="setForm">
            <h3 className="talentmineBlue">المعلومات الدميوغرافية*</h3>
              <div className="form-group">
                <h4 className="talentminePurple mt-4 mb-2">العمر:</h4> 
                <input
                  className="form-control"
                  type="number"
                  name="age"
                  onChange={this.onChange}
                  value={age}
                  placeholder="العمر"
                />
              </div>
              <div className="form-group mt-2">
              <h4 className="talentminePurple mt-3 mb-2">الجنس:</h4> 
              <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option selected>اختار...</option>
                <option value="1">ذكر</option>
                <option value="2">أنثى</option>
                </select>
              </div>
              <hr/>
              <h3 className="talentmineBlue">القياسات الأنثروبومترية*</h3>
              <div className="form-group">
                <h4 className="talentminePurple mt-4 mb-2">الطول:</h4> 
                <input
                  className="form-control"
                  type="number"
                  name="height"
                  onChange={this.onChange}
                  value={height}
                  placeholder="cm"
                />
              </div>
              <div className="form-group">
                <h4 className="talentminePurple mt-3 mb-2">الوزن:</h4> 
                <input
                  className="form-control"
                  type="number"
                  name="weight"
                  onChange={this.onChange}
                  value={weight}
                  placeholder="kg"
                />
              </div>
              <div className="form-group"><span className="text-secondary mb-2"></span>
           
                <h4 className="talentminePurple mt-3 mb-2">طول الذراع:</h4> 
                
                <i className="far fa-question-circle float-end mb-2" style={{color: "#FFC144", fontSize: '1.1rem'}}></i>
                <span className="text-secondary mb-2">يقاس من اول الاصبع الوسطي والي اول نقطة عظمية في اعلى الكتف باستخدام شريط قياس</span>
                <input
                  className="form-control"
                  type="number"
                  name="armL"
                  onChange={this.onChange}
                  value={armL}
                  placeholder="cm"
                />
              </div>
              <div className="form-group">
                <h4 className="talentminePurple mt-3 mb-2">طول الساق:</h4> 
                <i className="far fa-question-circle float-end mb-2" style={{color: "#FFC144", fontSize: '1.1rem'}}></i>
                <span className="text-secondary mb-2">يقاس من خارج القدم من الارض الى عظمة الحوض العلوية باستخدام شريط قياس</span>
                <input
                  className="form-control"
                  type="number"
                  name="legL"
                  onChange={this.onChange}
                  placeholder="cm"
                  value={legL}
                  
                />
              </div>
              <div className="form-group">
                <h4 className="talentminePurple mt-3 mb-2">محيط الصدر:</h4> 
                <i className="far fa-question-circle float-end mb-2" style={{color: "#FFC144", fontSize: '1.1rem'}}></i>
                <span className="text-secondary mb-2">يقاس مع الشهيق الاقصى بلف شريط القياس حول الصدر وحساب قيمة المحيط للصدر كامل</span>
                <input
                  className="form-control"
                  type="number"
                  name="chestG"
                  onChange={this.onChange}
                  value={chestG}
                  placeholder="cm"
                />
              </div>
              <hr/>
              <h3 className="talentmineBlue">معلومات اضافية لنتعرف اكثر</h3>
              <div className="form-group">
                <h4 className="talentminePurple mt-4 mb-2">النوع الاجتماعي المفضل للرياضة:</h4> 
                <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option selected value="1">لا تفضيل محدد...</option>
                <option value="3">فردي</option>
                <option value="2">جماعي</option>
                </select>
              </div>
              <div className="form-group">
                <h4 className="talentminePurple mt-3 mb-2">الرياضة المفضلة:</h4> 
                <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option selected>لا تفضيل محدد...</option>
                <option value="1">كرة القدم</option>
                <option value="2">ألعاب القوى</option>
                <option value="3">السباحة</option>
                <option value="4"> الرماية </option>
                <option value="5">التنس</option>
                <option value="6"> كرة السلة </option>
                <option value="7"> الكاراتيه </option>
                <option value="8">كرة الطائرة</option>
                <option value="9"> الجودو </option>
                <option value="10"> الجمباز </option>
                <option value="11"> أخرى </option>
                </select>
              </div>

            
              
            </form>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-xs-12 col-sm-12"><img src="https://tawassam.ams3.digitaloceanspaces.com/Test1/media/TalentmineRope.png" class="img-fluid ps-2" /></div>

            
           
            <div className="form-group d-grid mt-5 pt-4 px-5" form = "setForm">
              <button type="submit" className="btn btn-lg talentmineBlueBG btn-block mt-5 mb-5" onClick={this.onSubmit}>
              ابدأ التحليل
              </button>
            </div>
 
          </div>
          </div>
       )
     }
   }
   function mapStateToProps(state, ownProps) {
    let sessions = state.sessions.sessions;
  
    let auth = state.auth;
    let session = {};

    return { session: session, auth: auth, sessions: sessions };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(sessionActions, dispatch),
      createMessage: bindActionCreators(createMessage, dispatch)
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(FormSession);
  // export default connect(mapStateToProps, addSession, getAllSessions, createMessage )(FormSession);
