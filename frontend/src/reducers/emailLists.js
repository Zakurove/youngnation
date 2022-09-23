import { GET_EMAILLISTS, DELETE_EMAILLIST, ADD_EMAILLIST, SHOW_EMAILLIST, UPDATE_EMAILLIST, REPLACE_EMAILLIST, GET_MYEMAILLISTS, GET_ALLEMAILLISTS } from '../actions/types.js'

const initialState = {
  emailLists: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    // case GET_EMAILLISTS:
    //   return {
    //     ...state,
    //     emailLists: action.payload.filter((emailList) =>  emailList.subject == action.subject && emailList.block == action.block),
    //     //  &&
    //   }
      // case GET_MYEMAILLISTS:
      //   return {
      //     ...state,
      //     emailLists: action.payload.filter((emailList) =>  emailList.owner_username == action.user ),
      //   }
        case GET_ALLEMAILLISTS:
          return {
            ...state,
            emailLists: action.payload,
          }
      // case DELETE_EMAILLIST:
      //   return {
      //     ...state,
      //     emailLists: state.emailLists.filter((emailList) => emailList.id !== action.payload),
      //   };

      // case UPDATE_EMAILLIST:
      //   return {
      //     ...state,
      //     emailLists: state.emailLists.map(emailList => {
      //       if (emailList.id !== action.payload.id) {
      //         return emailList;
      //       } else {
      //         return { ...emailList, title: action.payload.title, description: action.payload.description, sets: action.setsArray };

      //       }
      //     })
      //   };


      case ADD_EMAILLIST:
        return {
          ...state,
          emailLists: [...state.emailLists, action.payload]
        };
      default:
        return state;
  }
}
