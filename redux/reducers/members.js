import { GET_MEMBERS } from "../actions/members/actionTypes";

const initialState = {
    members: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_MEMBERS: {
      // console.log("actionn:", action)
      return {
        ...state,
        members: action.members
      };
    }
    default:
      return state;
  }
}
