import { GET_MEMBERS} from "./actionTypes";
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


export const get_members = (syndicate_id, members) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/members`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          last_visit: Date(),
          members: members
          
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_MEMBERS,
          members: response.data.payload.syndicate.glueusers,
          status: response.data.status
        });
        
        
      }
      else {
        throw new Error('Error in members')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};
