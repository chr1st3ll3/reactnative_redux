import { GET_THEMES, REMOVE_THEMES, GET_POSTS, POST_COMMENT, POST_SUB_COMMENT, POST_RESPONSE, POST_VOTE, MARK_FAVORITE } from "../actions/themes/actionTypes";

const initialState = {
    themes: [],
    posts:[],
    subcomment: null,
    comment: null,
    status: 'nok',
    vote: null,
    chr: '<<'
   
};

export default function(state = initialState, action) {
  switch (action.type) {
    
    case  GET_THEMES: {
      // console.log("actionn:", action)
      return {
        ...state,
        themes: action.themes
      };
    }
    case  REMOVE_THEMES: {
      return {
        ...state,
        themes: []
      };
    }
    case  GET_POSTS: {
      // console.log("actionn:", action)
      return {
        ...state,
        posts: action.posts,
        chr: '**++'
      };
    }
    case  POST_COMMENT: {
      //console.log("actionn:", action)
      return {
        ...state,
        status: action.status,
        comment: action.comment
      };
    }
    case  POST_SUB_COMMENT: {
      return {
        ...state,
        status: action.status,
        subcomment: action.subcomment
      };
    }
    case  POST_RESPONSE: {
      return {
        ...state,
        status: action.status,
        response: action.response
      };
    }
    case  POST_VOTE: {
      return {
        ...state,
        status: action.status,
        vote: action.vote
      };
    }
    case  MARK_FAVORITE: {
      return {
        ...state,
        status: action.status
      };
    }
    default:
      return state;
  }
}
