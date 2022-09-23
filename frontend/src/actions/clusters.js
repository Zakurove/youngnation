import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_CLUSTERS, GETBLOCK_CLUSTERS, DELETE_CLUSTER, ADD_CLUSTER, SHOW_CLUSTER, UPDATE_CLUSTER, REPLACE_CLUSTER, GET_MYCLUSTERS, GET_ALLCLUSTERS} from './types';

//Choose Block

//GET Clusters
export const getClusters = (block, subject) => (dispatch, getState) => {
  axios.get('/api/clusters/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CLUSTERS,
        payload: res.data,
        subject: subject,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET Block CLuster
export const getBlockClusters = (block) => (dispatch, getState) => {
  axios.get('/api/clusters/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GETBLOCK_CLUSTERS,
        payload: res.data,
        block: block
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET My Clusters
export const getMyClusters = (user) => (dispatch, getState) => {
  axios.get('/api/clusters/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYCLUSTERS,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL CLUSTERS
export const getAllClusters = () => (dispatch, getState) => {
  axios.get('/api/clusters/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLCLUSTERS,
        payload: res.data,
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Cluster
export const addCluster = cluster => (dispatch, getState) => {
  axios
    .post('/api/clusters/', cluster, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Cluster Created Successfully"}))
      dispatch({
        type: ADD_CLUSTER,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Clusters
export const updateCluster = (cluster, id, setsArray) => (dispatch, getState) => {
  axios
    .put(`/api/clusters/${id}/`, cluster, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Cluster Edited"}))
      dispatch({
        type: UPDATE_CLUSTER,
        payload: res.data,
        setsArray: setsArray
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_CLUSTER
export const showCluster = id => (dispatch, getState) => {
  axios.get('/api/clusters/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_CLUSTER,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Clusters
export const deleteCluster = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/clusters/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Cluster Deleted"}))
      dispatch({
        type: DELETE_CLUSTER,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


