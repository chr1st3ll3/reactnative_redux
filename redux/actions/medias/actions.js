import { GET_MEDIAS} from "./actionTypes";
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


export const get_medias = (syndicate_id, medias) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/medias`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          last_visit: Date(),
          media_ids: medias
          
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_MEDIAS,
          medias: response.data.payload.medias,
          bottom_reached: response.data.payload.bottom_reached,
          status: response.data.status
        });
        
        
      }
      else {
        throw new Error('Error in medias')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};
