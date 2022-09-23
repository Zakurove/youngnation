import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_PRACTICEDESCSESSIONS, DELETE_PRACTICEDESCSESSION, ADD_PRACTICEDESCSESSION, SHOW_PRACTICEDESCSESSION, UPDATE_PRACTICEDESCSESSION, REPLACE_PRACTICEDESCSESSION, GET_MYPRACTICEDESCSESSIONS, GET_ALLPRACTICEDESCSESSIONS} from './types';

//Choose Block

//GET PracticeDescSessions
export const getPracticeDescSessions = (block) => (dispatch, getState) => {
  axios.get('/api/practiceDescSessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRACTICEDESCSESSIONS,
        payload: res.data,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET My PracticeDescSessions
export const getMyPracticeDescSessions = (user) => (dispatch, getState) => {
  axios.get('/api/practiceDescSessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYPRACTICEDESCSESSIONS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL PRACTICEDESCSESSIONS
export const getAllPracticeDescSessions = () => (dispatch, getState) => {
  axios.get('/api/practiceDescSessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLPRACTICEDESCSESSIONS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD PracticeDescSession
export const addPracticeDescSession = practiceDescSession => (dispatch, getState) => {
  axios
    .post('/api/practiceDescSessions/', practiceDescSession, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Practice Session Created Successfully"}))
      dispatch({
        type: ADD_PRACTICEDESCSESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update PracticeDescSessions
export const updatePracticeDescSession = (practiceDescSession, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/practiceDescSessions/${id}/`, practiceDescSession, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Practice Session Edited"}))
      dispatch({
        type: UPDATE_PRACTICEDESCSESSION,
        payload: res.data,
        setsArray: setsArray
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_PRACTICEDESCSESSION
export const showPracticeDescSession = id => (dispatch, getState) => {
  axios.get('/api/practiceDescSessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_PRACTICEDESCSESSION,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete PracticeDescSessions
export const deletePracticeDescSession = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/practiceDescSessions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Practice Session Deleted"}))
      dispatch({
        type: DELETE_PRACTICEDESCSESSION,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


