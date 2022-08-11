import { GET_PANELS, REMOVE_PANELS, ADD_PANEL } from "./actionTypes";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const setAuthHeader = async () => {
  const user_info = await AsyncStorage.getItem('@user_info');
  const token = JSON.stringify(JSON.parse(user_info).token);
  
  
  if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
  } else {
      axios.defaults.headers.common['Authorization'] = '';
  }
}

export function remove_panels(){
  return{
    type:REMOVE_PANELS,
    panels: []

  }
}

export const get_panels = () => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/syndicates_live_projects`;
    await setAuthHeader();
    return axios.get(
        url
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_PANELS,
          panels: response.data.payload.syndicates
        });
        
      }
      else {
        throw new Error('Error in panels')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const add_panel = (syndicate_id) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/get_syndicate_info`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id
        }
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        //console.log( response.data.payload.syndicate);
        return dispatch( {
          type: ADD_PANEL,
          panel: response.data.payload.syndicate,
          status: response.data.status
        });
        
      }
      else {
        throw new Error('Error in add_panel')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};