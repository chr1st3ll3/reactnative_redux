import { GET_PANELS, REMOVE_PANELS, ADD_PANEL } from "../actions/panels/actionTypes";

const initialState = {
    panels: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_PANELS: {
      return {
        ...state,
        panels: action.panels
      };
    }
    case  REMOVE_PANELS: {
      return {
        ...state,
        panels: []
      };
    }
    case  ADD_PANEL: {
      return {
        ...state,
        panel: action.panel
      };
    }
    default:
      return state;
  }
}
