
import {
  COMMENT_UPLOADER,
  INDIV_COMMENTS,
  DELETE_PHOTO_COMMENTS
  } from '../actions/types';
  
  let defaultState = {
    comment: null,
    filename: null,
    comments: null
  }
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case COMMENT_UPLOADER:
        return {
          ...state,
          comments: [action.payload, ...state.comments]
        }
      case INDIV_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }
      case DELETE_PHOTO_COMMENTS:
        return {
          ...state,
          comments: action.payload
        }
        default:
        return state;    
    }
  }