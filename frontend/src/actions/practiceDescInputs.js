import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_PRACTICEDESCINPUTS, DELETE_PRACTICEDESCINPUT, ADD_PRACTICEDESCINPUT, SHOW_PRACTICEDESCINPUT, UPDATE_PRACTICEDESCINPUT, REPLACE_PRACTICEDESCINPUT, GET_MYPRACTICEDESCINPUTS, GET_ALLPRACTICEDESCINPUTS} from './types';

//Choose Block

//GET PracticeDescInputs
export const getPracticeDescInputs = (block) => (dispatch, getState) => {
  axios.get('/api/practiceDescInputs/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PRACTICEDESCINPUTS,
        payload: res.data,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET My PracticeDescInputs
export const getMyPracticeDescInputs = (user) => (dispatch, getState) => {
  axios.get('/api/practiceDescInputs/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYPRACTICEDESCINPUTS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL PRACTICEDESCINPUTS
export const getAllPracticeDescInputs = () => (dispatch, getState) => {
  axios.get('/api/practiceDescInputs/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLPRACTICEDESCINPUTS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD PracticeDescInput
export const addPracticeDescInput = practiceDescInput => (dispatch, getState) => {
  axios
    .post('/api/practiceDescInputs/', practiceDescInput, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch({
        type: ADD_PRACTICEDESCINPUT,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update PracticeDescInputs
export const updatePracticeDescInput = (practiceDescInput, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/practiceDescInputs/${id}/`, practiceDescInput, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "PracticeDescInput Edited"}))
      dispatch({
        type: UPDATE_PRACTICEDESCINPUT,
        payload: res.data,
        setsArray: setsArray
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_PRACTICEDESCINPUT
export const showPracticeDescInput = id => (dispatch, getState) => {
  axios.get('/api/practiceDescInputs/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_PRACTICEDESCINPUT,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete PracticeDescInputs
export const deletePracticeDescInput = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/practiceDescInputs/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "PracticeDescInput Deleted"}))
      dispatch({
        type: DELETE_PRACTICEDESCINPUT,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


