import {
  DELETE_PHOTO,
  ALL_PHOTOS,
  MORE_PHOTOS,
  FIRST_PHOTOS,
  SINGLE_VIEW,
  SELECTED_UPLOADER
} from '../actions/types';

let defaultState = {
  array: null,
  arrays: null
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FIRST_PHOTOS:
      return {
        ...state,
        arrays: [...action.payload].slice(0, 2)
      }
    case MORE_PHOTOS:
      return {
        ...state,
        arrays: [...action.payload[0]].slice(0, action.payload[1].count)
      }
    case ALL_PHOTOS:
      return {
        ...state,
        arrays: action.payload
      }
    case DELETE_PHOTO:
      return {
        ...state,
        arrays: state.arrays.filter(r => r.filename !== action.payload)
      }
      case SELECTED_UPLOADER:
        console.log(action.payload, 'reducer')
        return {
        ...state,
        arrays: [action.payload, ...state.arrays]
        }
      case SINGLE_VIEW:
        // console.log([...action.payload[0]].find(r => r.filename === action.payload[1].file))
        //console.log(action.payload[1].file)
          return {
          ...state,
          array: [...action.payload[0]].find(r => r.filename === action.payload[1].file)
        }
      default:
      return state;    
  }
}