import { GET_PRACTICEDESCSESSIONS, DELETE_PRACTICEDESCSESSION, ADD_PRACTICEDESCSESSION, SHOW_PRACTICEDESCSESSION, UPDATE_PRACTICEDESCSESSION, REPLACE_PRACTICEDESCSESSION, GET_MYPRACTICEDESCSESSIONS, GET_ALLPRACTICEDESCSESSIONS } from '../actions/types.js'

const initialState = {
  practiceDescSessions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PRACTICEDESCSESSIONS:
      return {
        ...state,
        practiceDescSessions: action.payload.filter((practiceDescSession) => practiceDescSession.block == action.block),
        //  &&
      }
      case GET_MYPRACTICEDESCSESSIONS:
        return {
          ...state,
          practiceDescSessions: action.payload.filter((practiceDescSession) =>  practiceDescSession.owner == action.user ),
        }
        case GET_ALLPRACTICEDESCSESSIONS:
          return {
            ...state,
            practiceDescSessions: action.payload,
          }
      case DELETE_PRACTICEDESCSESSION:
        return {
          ...state,
          practiceDescSessions: state.practiceDescSessions.filter((practiceDescSession) => practiceDescSession.id !== action.payload),
        };

      case UPDATE_PRACTICEDESCSESSION:
        return {
          ...state,
          practiceDescSessions: state.practiceDescSessions.map(practiceDescSession => {
            if (practiceDescSession.id !== action.payload.id) {
              return practiceDescSession;
            } else {
              return { ...practiceDescSession, title: action.payload.title, description: action.payload.description, sets: action.setsArray };

            }
          })
        };


      case ADD_PRACTICEDESCSESSION:
        return {
          ...state,
          practiceDescSessions: [...state.practiceDescSessions, action.payload]
        };
      default:
        return state;
  }
}
