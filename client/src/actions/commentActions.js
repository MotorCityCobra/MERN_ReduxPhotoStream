import axios from 'axios';
import { COMMENT_UPLOADER,
        INDIV_COMMENTS,
        DELETE_PHOTO_COMMENTS } from './types';
import { returnErrors } from './errorActions';

export const commentUploader = (content, page) => (dispatch) => {
  // FOR GRIDFS
  // const jcomment = JSON.stringify({ content });
  // const fd = new FormData();
  // fd.append('content', jcomment)
  axios
    .post('/api/comments/comment/upload/', { content, page })
    .then(res =>
      // console.log(res.data, 'that was me')
      dispatch({
        type: COMMENT_UPLOADER,
        payload: res.data
      })
    )
.catch(err =>
  dispatch(returnErrors(err.response.data, err.response.status))
);
}

export const individualComments = filename => (dispatch) => {
  axios
    .get(`/api/comments/comments/${filename}`)
    .then(res =>
      //console.log(res.data)
      dispatch({
        type: INDIV_COMMENTS,
        payload: res.data
      })
    )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
}

export const deletePhotoComments = filename => (dispatch) => {
  axios
    .delete(`/api/comments/comments/all/${filename}`)
    .then(
      dispatch({
        type: DELETE_PHOTO_COMMENTS,
        payload: filename
      })
    )
  .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status))
  );
}