import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_PRACTICEIDENTIFYSESSIONS, DELETE_PRACTICEIDENTIFYSESSION, ADD_PRACTICEIDENTIFYSESSION, SHOW_PRACTICEIDENTIFYSESSION, UPDATE_PRACTICEIDENTIFYSESSION, REPLACE_PRACTICEIDENTIFYSESSION, GET_MYPRACTICEIDENTIFYSESSIONS, GET_ALLPRACTICEIDENTIFYSESSIONS} from './types';

//Choose Block

//GET PracticeIdentifySessions
export const getPracticeIdentifySessions = (block) => (dispatch, getState) => {
  axios.get('/api/practiceIdentifySessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRACTICEIDENTIFYSESSIONS,
        payload: res.data,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET My PracticeIdentifySessions
export const getMyPracticeIdentifySessions = (user) => (dispatch, getState) => {
  axios.get('/api/practiceIdentifySessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYPRACTICEIDENTIFYSESSIONS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL PRACTICEIDENTIFYSESSIONS
export const getAllPracticeIdentifySessions = () => (dispatch, getState) => {
  axios.get('/api/practiceIdentifySessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLPRACTICEIDENTIFYSESSIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD PracticeIdentifySession
export const addPracticeIdentifySession = practiceIdentifySession => (dispatch, getState) => {
  axios
    .post('/api/practiceIdentifySessions/', practiceIdentifySession, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Practice Session Initiated Successfully"}))
      dispatch({
        type: ADD_PRACTICEIDENTIFYSESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Session
export const updatePracticeIdentifySession = (practiceIdentifySession, id, results) => (dispatch, getState) => {
  axios
    .put(`/api/practiceIdentifySessions/${id}/`, practiceIdentifySession, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch({
        type: UPDATE_PRACTICEIDENTIFYSESSION,
        payload: res.data,
        results: results
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_PRACTICEIDENTIFYSESSION
export const showPracticeIdentifySession = id => (dispatch, getState) => {
  axios.get('/api/practiceIdentifySessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_PRACTICEIDENTIFYSESSION,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete PracticeIdentifySessions
export const deletePracticeIdentifySession = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/practiceIdentifySessions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Practice Session Deleted"}))
      dispatch({
        type: DELETE_PRACTICEIDENTIFYSESSION,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


