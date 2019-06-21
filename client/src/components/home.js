import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { firstPhotos, morePhotos, deletePhoto, uploadHandlerer } from '../actions/photoActions'
import { deletePhotoComments } from '../actions/commentActions'


import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Home extends React.Component {
  // static propTypes = {
  //   firstPhotos: PropTypes.func.isRequired,
  //   arrays: PropTypes.object.isRequired
  // }
  constructor(props) {
    super(props)
    this.state = { 
      arrays: [],
      count: 5,
      valid: true
    }
    this.onFileChange = this.onFileChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  
  componentDidMount() {
    this.props.firstPhotos()
  }
  onClickDelete = filename => {
    this.props.deletePhoto(filename);
    this.props.deletePhotoComments(filename);
  }

  onFileChange(e) {
    if (e.target.files[0]) {
      this.setState( {valid: true} )
    } else {
      this.setState( {valid: false} )
    }
  }
  submit(e) {
    e.preventDefault()
    const myFile = (this.refs.myFile).files[0]
      this.props.uploadHandlerer(myFile)
  }
  
  getNext = () => {
    this.setState({ count: this.state.count + 3});
    this.props.morePhotos(this.state.count)
  }
  render() {
    //console.log(this.props)

    if (!this.props.arrays) {
      return(
        <div>...Loading</div>
      )
    } else {
    const { arrays } = this.props;
    return (
      <div>
      <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <h1 className="text-center display-4 my-4">MERN, Redux <br/>Photo Stream</h1>
          <form action="/api/items/upload" method="POST" encType="multipart/form-data">
            <div className="custom-file mb-3">
              <input type="file" ref='myFile' onChange={this.onFileChange} name="file" id="file" className="custom-file-input"/>
              <label htmlFor="file" className="custom-file-label">Choose File</label>
            </div>
            <input type="submit" onClick={this.submit} value="Submit" name="file" className="btn btn-primary btn-block"/>
          </form>
          <hr/>
            <InfiniteScroll
            dataLength={this.props.arrays.length}
            next={this.getNext}
            hasMore={true}
            >
              {arrays.map(({ _id, filename }) => (
                  <TransitionGroup>
                    <CSSTransition key={_id} timeout={233} classNames="fade">
                      <div className="card card-body mb-3" key={_id}>
                      <Link to={'/image/' + filename} >
                        <img src={'/api/items/image/'+ filename}  key={_id} alt="" className="imaage"/>
                        </Link>
                        <form>
                          <Button
                          className="btn btn-danger
                          btn-block mt-4"
                          onClick={this.onClickDelete.bind(this, filename)}
                          >Delete</Button>
                        </form>
                      </div>
                    </CSSTransition>
                  </TransitionGroup>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      </div>
    );
  }}
}

const mapStateToProps = () => (state) => {
  return {
    arrays: state.photos.arrays
  }
}

export default connect(mapStateToProps,
  { firstPhotos,
    morePhotos,
    deletePhoto,
    uploadHandlerer,
    deletePhotoComments
   })(Home);