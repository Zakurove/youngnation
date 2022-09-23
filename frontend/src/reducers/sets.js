import { GET_SETS,GET_IMAGES, GETBLOCK_SETS,DELETE_SET, ADD_SET, SHOW_SET, UPDATE_SET, REPLACE_SET, GET_MYSETS, GET_ALLSETS, GET_SETS_BY_ID } from '../actions/types.js'

const initialState = {
  sets: [],
  images: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_SETS:
      return {
        ...state,
        sets: action.payload.filter((set) =>  set.subject == action.subject && set.block == action.block),
        //  &&
      }
      case GETBLOCK_SETS:
        return {
          ...state,
          sets: action.payload.filter((set) =>  set.block == action.block),
          //  &&
        }
      case GET_SETS_BY_ID:
        return {
          ...state,
          notedSets: action.payload.find((set) =>  set.block == action.block && set.id == action.id),
          //  &&
        }
      case GET_MYSETS:
        return {
          ...state,
          sets: action.payload.filter((set) =>  set.owner == action.user ),
          // sets: action.payload.filter((set) =>  set.subject == action.subject && set.block == action.block),
          //  &&
        }
        case GET_ALLSETS:
          return {
            ...state,
            sets: action.payload,
          }
          case GET_IMAGES:
            return {
              ...state,
              images: action.payload,
            }
      case DELETE_SET:
        return {
          ...state,
          sets: state.sets.filter((set) => set.id !== action.payload),
        };

      case UPDATE_SET:
        return {
          ...state,
          sets: state.sets.map(set => {
            if (set.id !== action.payload.id) {
              return set;
            } else {
              return { ...set, title: action.payload.title, description: action.payload.description, references: action.payload.references, images: action.payload.images };
            }
          })
        };


      case ADD_SET:
        return {
          ...state,
          sets: [...state.sets, action.payload]
        };
      default:
        return state;
  }
}
