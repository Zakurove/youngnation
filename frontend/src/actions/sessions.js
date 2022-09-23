import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_SESSIONS, GET_IMAGES, GETBLOCK_SESSIONS, DELETE_SESSION, ADD_SESSION, SHOW_SESSION, UPDATE_SESSION, REPLACE_SESSION, GET_MYSESSIONS, GET_ALLSESSIONS, GET_SESSIONS_BY_ID} from './types';

//Choose Block

//GET Sessions
export const getSessions = () => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SESSIONS,
        payload: res.data,
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//GET Sessions By ID
export const getSessionById = (block, id) => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SESSIONS_BY_ID,
        payload: res.data,
        block: block,
        id: id
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET My Sessions
export const getMySessions = (user) => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYSESSIONS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL SESSIONS
export const getAllSessions = () => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLSESSIONS,
        payload: res.data,
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Sessions
export const addSession = session => (dispatch, getState) => {
  axios
    .post('/api/sessions/', session, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Session Added Successfully"}))
      dispatch({
        type: ADD_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Sessions
export const updateSession = (session, id) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Session Edited"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_SESSION
export const showSession = id => (dispatch, getState) => {
  axios.get('/api/sessions/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_SESSION,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Sessions
export const deleteSession = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/sessions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Session Deleted"}))
      dispatch({
        type: DELETE_SESSION,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//Add Note
export const addNote = (session, id) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({success: "Note Added"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//Remove Images
export const removeImage = (session, id) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Image Removed"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Edit Note
export const editNote = (session, id) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({info: "Note Edited"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Note
export const deleteNote = (session, id) => (dispatch, getState) => {
  axios
    .put(`/api/sessions/${id}/`, session, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Note Deleted"}))
      dispatch({
        type: UPDATE_SESSION,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  };