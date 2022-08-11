import { CLEAR_ERROR, LOGIN_ATTEMPT, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from "./actionTypes";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export function isLoading(bool){
  return{
    type:LOGIN_ATTEMPT,
    isLoading:bool
  }
}

export function loginSuccess(userData){
  return{
    type:LOGIN_SUCCESS,
    userData
  }
}

export function loginFailed(error){
  return{
    type:LOGIN_FAILED,
    error,
  }
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
    error: ''
  }
}

export function login(data){
  return (dispatch) => {
    dispatch(isLoading(true));
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/login`;
    return axios.post(
        url,
        {
            uni_email: data.email, 
            uni_password: data.password, 
        }
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        dispatch(isLoading(false))
        dispatch(loginSuccess(response.data.payload))
        await AsyncStorage.setItem('@user_info', JSON.stringify(response.data.payload))
      }
      else{
        dispatch(isLoading(false))
        dispatch(loginFailed(response.data.payload.message))
      }
      return {
        payload: response.data.payload,
        status: response.data.status
      }
    })
    .catch((error) => {
      console.log("error",error);
      dispatch(isLoading(false))
      dispatch(loginFailed(error))
    })
  }
}

export function logout(userData){
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

