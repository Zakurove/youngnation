import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_SETS, GET_IMAGES, GETBLOCK_SETS, DELETE_SET, ADD_SET, SHOW_SET, UPDATE_SET, REPLACE_SET, GET_MYSETS, GET_ALLSETS, GET_SETS_BY_ID} from './types';

//Choose Block

//GET Sets
export const getSets = (block, subject) => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SETS,
        payload: res.data,
        subject: subject,
        block: block
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET Images
export const getImages = () => (dispatch, getState) => {
  axios.get('/api/images/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_IMAGES,
        payload: res.data,
        
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET Sets Block
export const getBlockSets = (block) => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GETBLOCK_SETS,
        payload: res.data,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET Sets By ID
export const getSetById = (block, id) => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SETS_BY_ID,
        payload: res.data,
        block: block,
        id: id
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET My Sets
export const getMySets = (user) => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYSETS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL SETS
export const getAllSets = () => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLSETS,
        payload: res.data,
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Sets
export const addSet = set => (dispatch, getState) => {
  axios
    .post('/api/sets/', set, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Set Added Successfully"}))
      dispatch({
        type: ADD_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Sets
export const updateSet = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/sets/${id}/`, set, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Set Edited"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_SET
export const showSet = id => (dispatch, getState) => {
  axios.get('/api/sets/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_SET,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Sets
export const deleteSet = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/sets/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Set Deleted"}))
      dispatch({
        type: DELETE_SET,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//Add Note
export const addNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/sets/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({success: "Note Added"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//Remove Images
export const removeImage = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/sets/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Image Removed"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Edit Note
export const editNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/sets/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({info: "Note Edited"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Note
export const deleteNote = (set, id) => (dispatch, getState) => {
  axios
    .put(`/api/sets/${id}/`, set, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Note Deleted"}))
      dispatch({
        type: UPDATE_SET,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  };