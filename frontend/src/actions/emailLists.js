import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_EMAILLISTS, DELETE_EMAILLIST, ADD_EMAILLIST, SHOW_EMAILLIST, UPDATE_EMAILLIST, REPLACE_EMAILLIST, GET_MYEMAILLISTS, GET_ALLEMAILLISTS} from './types';



//GET ALL EMAILLISTS
export const getAllEmailLists = () => (dispatch, getState) => {
  axios.get('/api/emailLists/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLEMAILLISTS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//ADD EmailList
export const addEmailList = emailList => (dispatch, getState) => {
  axios
    .post('/api/emailLists/', emailList, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Information successfully submitted."}))
      dispatch({
        type: ADD_EMAILLIST,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


