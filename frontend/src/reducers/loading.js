import { LOADING_ON, LOADING_OFF, LOADING } from '../actions/types';

const initialState = {
    loadingState: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING:
        return {
          ...state,
          loadingState: action.payload
        };
        case LOADING_ON:
            return {
              ...state,
              loadingState: true
            };
            case LOADING_OFF:
                return {
                  ...state,
                  loadingState: false
                };
    default:
      return state;
  }
}