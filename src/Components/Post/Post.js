import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import '../Dashboard/Dashboard.css'
import './Post.css'

class Post extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      img: '',
      content: '',
      author: '',
      authorpicture: '',
      author_id: '',
      post_id: ''
    }
  }

  getPost = () => {
    const { postid } = this.props.match.params
    axios.get(`/api/post/${postid}`).then(res => {
      const {
        title,
        content,
        img,
        author,
        authorpicture,
        author_id,
        post_id
      } = res.data
      this.setState({
        title,
        content,
        img,
        author,
        authorpicture,
        author_id,
        post_id
      })
    })
  }

  componentDidMount() {
    this.getPost()
  }

  render() {
    const {
      title,
      img,
      content,
      author,
      authorpicture,
      author_id,
      post_id
    } = this.state
    const { id } = this.props
    const { deletePost } = this.props.location.state
    return (
      <div className='Post'>
        <div className='post-top'>
          <h2 className='post-title'>{title}</h2>
          <div className='author-cont'>
            <h4>{author}</h4>
            <img
              src={authorpicture}
              alt='author profile pic'
              className='author-img'
            />
          </div>
        </div>
        <div className='post-body'>
          <img
            src={img}
            alt='something related to the post'
            className='post-img'
          />
          <p className='post-content'>{content}</p>
        </div>
        {author_id === id ? (
          <input
            type='button'
            value='Delete'
            id='delete-btn'
            onClick={() => {
              deletePost(post_id)
            }}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Post)
