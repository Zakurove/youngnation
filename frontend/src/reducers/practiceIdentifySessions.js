import { GET_PRACTICEIDENTIFYSESSIONS, DELETE_PRACTICEIDENTIFYSESSION, ADD_PRACTICEIDENTIFYSESSION, SHOW_PRACTICEIDENTIFYSESSION, UPDATE_PRACTICEIDENTIFYSESSION, REPLACE_PRACTICEIDENTIFYSESSION, GET_MYPRACTICEIDENTIFYSESSIONS, GET_ALLPRACTICEIDENTIFYSESSIONS } from '../actions/types.js'

const initialState = {
  practiceIdentifySessions: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PRACTICEIDENTIFYSESSIONS:
      return {
        ...state,
        practiceIdentifySessions: action.payload.filter((practiceIdentifySession) => practiceIdentifySession.block == action.block),
        //  &&
      }
      case GET_MYPRACTICEIDENTIFYSESSIONS:
        return {
          ...state,
          practiceIdentifySessions: action.payload.filter((practiceIdentifySession) =>  practiceIdentifySession.owner == action.user ),
        }
        case GET_ALLPRACTICEIDENTIFYSESSIONS:
          return {
            ...state,
            practiceIdentifySessions: action.payload,
          }
      case DELETE_PRACTICEIDENTIFYSESSION:
        return {
          ...state,
          practiceIdentifySessions: state.practiceIdentifySessions.filter((practiceIdentifySession) => practiceIdentifySession.id !== action.payload),
        };

      case UPDATE_PRACTICEIDENTIFYSESSION:
        return {
          ...state,
          practiceIdentifySessions: state.practiceIdentifySessions.map(practiceIdentifySession => {
            if (practiceIdentifySession.id !== action.payload.id) {
              return practiceIdentifySession;
            } else {
              return { ...practiceIdentifySession, results: action.results };

            }
          })
        };


      case ADD_PRACTICEIDENTIFYSESSION:
        return {
          ...state,
          practiceIdentifySessions: [...state.practiceIdentifySessions, action.payload]
        };
      default:
        return state;
  }
}
