import { 
 CLEAR_ERROR, LOGIN_ATTEMPT, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "../actions/login/actionTypes";

const initialState = {

    isLoggedIn: false,
    isLoading: false,
    userData: {},
    error: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        isLoading:false,
        isLoggedIn:false,
        error: '',
      }
      break;
    case LOGIN_ATTEMPT:
      return{
        ...state,
        isLoading:true,
        isLoggedIn:false
      }
      break;
    case LOGIN_SUCCESS:
      return{
        ...state,
        isLoading:false,
        isLoggedIn:true,
        userData:action.userData,
        error:undefined
      }
      break;
    case LOGIN_FAILED:
      return{
        ...state,
        isLoading:false,
        isLoggedIn:false,
        error: action.error
      }
      break;
    case LOGOUT:
      return{
        ...state,
        isLoading:false,
        isLoggedIn:false
      }
      break;
    default:
      return state;
  }
}
