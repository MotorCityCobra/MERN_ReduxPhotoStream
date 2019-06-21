import { combineReducers } from 'redux';
import photoReducer from './photoReducer';
import errorReducer from './errorReducer';
import commentReducer from './commentReducer';



export default combineReducers({
  photos: photoReducer,
  error: errorReducer,
  comments: commentReducer
})
