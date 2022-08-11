import { GET_MAP} from "./actionTypes";
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

export const get_map = (syndicate_id, responses) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/get_posts`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          syndicate_question_id: null,
          last_visit: Date(),
          responses: responses,
          hashtags: [],
          untagged_responses: [],
          max_points_theme_timeline: null,
          question_type: 2
          
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_MAP,
          map: response.data.payload.responses,
          bottom_reached: response.data.payload.bottom_reached,
          status: response.data.status
        });
        
        
      }
      else {
        throw new Error('Error in map')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};
