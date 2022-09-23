import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, alert, message } = this.props;
    if(error !== prevProps.error) {
      if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if(error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if(error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
      if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
      if(error.msg.username) alert.error(error.msg.username.join());
      if(error.msg.detail) if(error.msg.detail == 'You do not have permission to perform this action.') alert.error(error.msg.detail);
      if(error.msg.title) if(error.msg.title == 'This field may not be blank.') alert.error(`Title: ${error.msg.title.join()}`);
      if(error.msg.sets) if(error.msg.title == 'This list may not be empty.') alert.error(`You must choose sets`);
    }
    if(message !== prevProps.message){
      if(message.deleteLead) alert.success(message.deleteLead);
      if(message.addLead) alert.success(message.addLead);
      if(message.danger) alert.error(message.danger);
      if(message.success) alert.success(message.success);
      if(message.info) alert.show(message.info);
      if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if(message.roleNotSelected) alert.error(message.roleNotSelected);
      if(message.titleEmpty) alert.error(message.titleEmpty);
      if(message.setsListEmpty) alert.error(message.setsListEmpty);
      
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});


export default connect(mapStateToProps)(withAlert()(Alerts));
