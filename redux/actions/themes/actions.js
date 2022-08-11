import { GET_THEMES, REMOVE_THEMES, GET_POSTS, GET_KTS, POST_COMMENT, POST_SUB_COMMENT, POST_RESPONSE, POST_VOTE, MARK_FAVORITE } from "./actionTypes";
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

export function remove_themes(){
  return{
    type:REMOVE_THEMES,
    themes: []
  }
}

export const get_themes = (syndicate_id) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/syndicate_themes`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id: 25
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_THEMES,
          themes: response.data.payload.themes
        });
        
      }
      else {
        throw new Error('Error in themes')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const get_posts = (syndicate_id, syndicate_question_id, posts) => {
  
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/get_posts`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          syndicate_question_id,
          last_visit: Date(),
          responses: posts,
          hashtags: [],
          untagged_responses: [],
          max_points_theme_timeline: null,
          question_type: 1
        }
        
    )
    
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_POSTS,
          posts: response.data.payload.responses,
          bottom_reached: response.data.payload.bottom_reached
        });
        
      }
      else {
        throw new Error('Error in posts')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const get_kts = (syndicate_id, syndicate_question_id, kts) => {
  
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/load_keytakeaways`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          syndicate_question_id
        }
        
    )
    .then(async(response) => {
      
      if(response.data.status === 'ok'){
        return dispatch( {
          type: GET_KTS,
          kts: response.data.payload.quotelists,
          show_key_takeaways: response.data.payload.show_key_takeaways
        });
      }
      else {
        throw new Error('Error in kts')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const post_comment = (syndicate_question_response_id, content) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/add_wn_comment`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_question_response_id,
          content,
          reaction: 3
        }
        
    )
    .then(async(response) => {
      //console.log(`response.data.payload = ${JSON.stringify(response.data.payload)}`)
      
      if(response.data.status === 'ok'){
        return dispatch( {
          type: POST_COMMENT,
          status: response.data.status,
          comment: response.data.payload.comment
        });
        
      }
      else {
        throw new Error('Error in post comment')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const post_sub_comment = (syndicate_question_response_id, content) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/add_wn_subcomment`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_question_response_id,
          content,
          reaction: 3
        }
        
    )
    .then(async(response) => {
      
      if(response.data.status === 'ok'){
        return dispatch( {
          type: POST_SUB_COMMENT,
          status: response.data.status,
          subcomment: response.data.payload.subcomment
        });
        
      }
      else {
        throw new Error('Error in post subcomment')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const post_response = (syndicate_id, content, title, labels, user_id ) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/add_qa_response`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          content,
          title,
          labels,
          user_id
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: POST_RESPONSE,
          status: response.data.status,
          response: response.data.payload.response
        });
        
      }
      else {
        throw new Error('Error in post response')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const post_vote = (syndicate_id, ref_id, ref_type_id, vote_type) => {
  //console.log('VOtes-->', syndicate_id, ref_id, ref_type_id, vote_type)
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/process_vote`;
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          ref_id,
          ref_type_id,
          vote_type
        }
        
    )
    .then(async(response) => {
      if(response.data.status === 'ok'){
        return dispatch( {
          type: POST_VOTE,
          status: response.data.status,
          vote: vote_type
        });
        
      }
      else {
        throw new Error('Error in post vote')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};

export const mark_favorite = (syndicate_id, ref_id, ref_type_id, is_favorite) => {
  return async(dispatch) => {
    const url = `${Constants.manifest.extra.CURRNT_API_URL}/api/ks/mobile/v1/mark_favorite`;
    console.log('Function', syndicate_id, ' ', ref_id, ' ', ref_type_id, ' ' , is_favorite);
    await setAuthHeader();
    return axios.post(
        url,
        {
          syndicate_id,
          ref_id,
          ref_type_id,
          is_favorite
        }
        
    )
    .then(async(response) => {
      console.log('Response>>>', response.data);
      if(response.data.status === 'ok'){
        return dispatch( {
          type: MARK_FAVORITE,
          status: response.data.status
        });
        
      }
      else {
        throw new Error('Error in mark favorite**')
      }
    })
    .catch((error) => {
      console.log("error",error);
    })
  }
};