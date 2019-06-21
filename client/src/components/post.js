import React from 'react';
import { connect } from 'react-redux';
import { allPhotos, singleView } from '../actions/photoActions';
import { commentUploader, individualComments } from '../actions/commentActions';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

class Post extends React.Component {
  constructor(props) {
    super(props)
    this.submitFormHandler = this.submitFormHandler.bind(this)

  }
  componentDidMount() {
    this.props.singleView(this.props.match.params.filename);
    this.props.individualComments(this.props.match.params.filename);
    window.scrollTo(0, 0);
  }

  submitFormHandler = (e) => {
    e.preventDefault();
    const ncomment = (this.refs.aComment.value)
    const page = this.props.match.params.filename
    this.props.commentUploader(ncomment, page)
    this.refs.aComment.value = '';
  }

  render() {
    const z = this.props.comments ? (
      <div>
        <Link to={'/'} >
          <h4 className="home-text">home</h4>
        </Link>
      <div className="card card-body mb-3">
        <img src={`/api/items/image/${this.props.array.filename}`}
        alt="" className="post-imaage"/>
        <br/>
        <form className="comment-submitter"
        name='myComment' width="40%"
        onSubmit={this.submitFormHandler}>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea className="form-control" rows="5" id="comment"
          type="text" ref="aComment"></textarea>
        </div>
        <Button
          className="btn
          btn-block mt-4"
          type="submit"
          >Submit</Button>
          </form>
          </div>
            <div className="container-home">
            {/* <InfiniteScroll
              dataLength={this.state.posts.length}
              next={this.getNext}
              hasMore={true}
              > */}
            <h4 className="another-comment">Comments</h4>
            {this.props.comments.map(post => (
            <div className="post-card" key={post._id}>
                <div className="card-content">
                    <span className="card-title  red-text">Date:{post.date}</span>
                  <p className="comment-text-in">Comment: {post.content}</p>
                </div>
              </div>))}
            {/* </InfiniteScroll> */}
          </div>
        </div>
    ) : (
      <div className="center">Loading...</div>
    )
    return (
      <div className="container">
        {z}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    array: state.photos.array,
    comments: state.comments.comments
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     commentUploader: (comment) => {
//       dispatch({
//         type: "COMMENT_UPLOADER",
//         payload: comment
//       })
//     }
//   }
// }

export default connect(mapStateToProps,
  { allPhotos, singleView, commentUploader,
    individualComments })(Post);