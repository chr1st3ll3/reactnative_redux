import { GET_MEDIAS } from "../actions/medias/actionTypes";

const initialState = {
    medias: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_MEDIAS: {
      // console.log("actionn:", action)
      return {
        ...state,
        medias: action.medias
      };
    }
    default:
      return state;
  }
}
