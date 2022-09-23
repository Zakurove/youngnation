import { GET_SESSIONS,GET_IMAGES, GETBLOCK_SESSIONS,DELETE_SESSION, ADD_SESSION, SHOW_SESSION, UPDATE_SESSION, REPLACE_SESSION, GET_MYSESSIONS, GET_ALLSESSIONS, GET_SESSIONS_BY_ID } from '../actions/types.js'

const initialState = {
  sessions: [],
  images: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
        //  &&
      }
      case GETBLOCK_SESSIONS:
        return {
          ...state,
          sessions: action.payload.filter((session) =>  session.block == action.block),
          //  &&
        }
      case GET_SESSIONS_BY_ID:
        return {
          ...state,
          notedSets: action.payload.find((session) =>  session.block == action.block && session.id == action.id),
          //  &&
        }
      case GET_MYSESSIONS:
        return {
          ...state,
          sessions: action.payload.filter((session) =>  session.owner == action.user ),
          // sessions: action.payload.filter((session) =>  session.subject == action.subject && session.block == action.block),
          //  &&
        }
        case GET_ALLSESSIONS:
          return {
            ...state,
            sessions: action.payload,
          }
          case GET_IMAGES:
            return {
              ...state,
              images: action.payload,
            }
      case DELETE_SESSION:
        return {
          ...state,
          sessions: state.sessions.filter((session) => session.id !== action.payload),
        };

      case UPDATE_SESSION:
        return {
          ...state,
          sessions: state.sessions.map(session => {
            if (session.id !== action.payload.id) {
              return session;
            } else {
              return { ...session, title: action.payload.title, description: action.payload.description, references: action.payload.references, images: action.payload.images };
            }
          })
        };


      case ADD_SESSION:
        return {
          ...state,
          sessions: [...state.sessions, action.payload]
        };
      default:
        return state;
  }
}
