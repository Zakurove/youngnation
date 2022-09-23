import { LOADING, LOADING_ON, LOADING_OFF } from './types';


  export const loadingOn = () => dispatch => {
      dispatch ({
          type: LOADING_ON
      })
  }
  export const loadingOff = () => dispatch => {
    dispatch ({
        type: LOADING_OFF
    })
}