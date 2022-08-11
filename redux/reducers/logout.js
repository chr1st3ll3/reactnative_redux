import { 
    CLEAR_ERROR, LOGOUT_ATTEMPT, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGOUT } from "../actions/logout/actionTypes";
   
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
       case LOGOUT_ATTEMPT:
         return{
           ...state,
           isLoading:true,
           isLoggedIn:false
         }
         break;
       case LOGOUT_SUCCESS:
         return{
           ...state,
           isLoading:false,
           isLoggedIn:true,
           userData:action.userData,
           error:undefined
         }
         break;
       case LOGOUT_FAILED:
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
   