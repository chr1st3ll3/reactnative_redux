import { GET_MAP } from "../actions/map/actionTypes";

const initialState = {
    map: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_MAP: {
      // console.log("actionn:", action)
      return {
        ...state,
        map: action.map
      };
    }
    default:
      return state;
  }
}
