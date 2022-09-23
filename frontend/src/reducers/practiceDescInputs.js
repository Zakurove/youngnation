import { GET_PRACTICEDESCINPUTS, DELETE_PRACTICEDESCINPUT, ADD_PRACTICEDESCINPUT, SHOW_PRACTICEDESCINPUT, UPDATE_PRACTICEDESCINPUT, REPLACE_PRACTICEDESCINPUT, GET_MYPRACTICEDESCINPUTS, GET_ALLPRACTICEDESCINPUTS } from '../actions/types.js'

const initialState = {
  practiceDescInputs: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PRACTICEDESCINPUTS:
      return {
        ...state,
        practiceDescInputs: action.payload.filter((practiceDescInput) => practiceDescInput.block == action.block),
        //  &&
      }
      case GET_MYPRACTICEDESCINPUTS:
        return {
          ...state,
          practiceDescInputs: action.payload.filter((practiceDescInput) =>  practiceDescInput.owner == action.user ),
        }
        case GET_ALLPRACTICEDESCINPUTS:
          return {
            ...state,
            practiceDescInputs: action.payload,
          }
      case DELETE_PRACTICEDESCINPUT:
        return {
          ...state,
          practiceDescInputs: state.practiceDescInputs.filter((practiceDescInput) => practiceDescInput.id !== action.payload),
        };

      case UPDATE_PRACTICEDESCINPUT:
        return {
          ...state,
          practiceDescInputs: state.practiceDescInputs.map(practiceDescInput => {
            if (practiceDescInput.id !== action.payload.id) {
              return practiceDescInput;
            } else {
              return { ...practiceDescInput, title: action.payload.title, description: action.payload.description, sets: action.setsArray };

            }
          })
        };


      case ADD_PRACTICEDESCINPUT:
        return {
          ...state,
          practiceDescInputs: [...state.practiceDescInputs, action.payload]
        };
      default:
        return state;
  }
}
