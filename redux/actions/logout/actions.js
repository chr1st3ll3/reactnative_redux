import { CLEAR_ERROR, LOGOUT_ATTEMPT, LOGOUT_FAILED, LOGOUT_SUCCESS, LOGOUT } from "./actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';
export function isLoading(bool){
    return{
      type:LOGOUT_ATTEMPT,
      isLoading:bool
    }
  }
  
  export function logoutSuccess(userData){
    return{
      type:LOGOUT_SUCCESS,
      userData
    }
  }
  
  export function logoutFailed(error){
    return{
      type:LOGOUT_FAILED,
      error,
    }
  }
  
  export function clearError() {
    return {
      type: CLEAR_ERROR,
      error: ''
    }
  }

export function logout(userData){
    console.log(`userData = ${userData}`)
    return async(dispatch) => {
      dispatch(isLoading(true));
      await AsyncStorage.removeItem('@user_info')
      dispatch(isLoading(false));
      console.log('logout success')
      return {
        type: LOGOUT,
        userData: {}
      }
    }
  }
  