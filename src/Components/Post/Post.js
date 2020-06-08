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
      post_id: '',
      editing: false
    }
  }

  changeHandler = e => this.setState({ [e.target.name]: e.target.value })

  toggleEdit = () => {
    const { editing } = this.state
    if (editing) {
      this.getPost()
    }
    this.setState({ editing: !editing })
  }

  editPost = async () => {
    const { title, img, content, post_id } = this.state,
      post = (
        await axios
          .put(`/api/post/${post_id}`, { title, img, content })
          .catch(err => {
            alert('Whoops, something went wrong. Check console')
            console.log(err)
          })
      ).data
    this.setState({
      title: post.title,
      img: post.img,
      content: post.content,
      editing: false
    })
    this.getPost()
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
      post_id,
      editing
    } = this.state
    const { id } = this.props
    return (
      <div className='Post'>
        <div className='post-top'>
          <h2 className='post-title'>
            {editing ? (
              <input
                type='text'
                name='title'
                value={title}
                onChange={this.changeHandler}
              />
            ) : (
              title
            )}
          </h2>
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
          {editing ? (
            <div className='img-post-cont'>
              <img
                src={img}
                alt='something related to the post'
                className='post-img'
              />
              <input
                className='img-edit-field'
                type='text'
                name='img'
                value={img}
                onChange={this.changeHandler}
              />
            </div>
          ) : (
            <img
              src={img}
              alt='something related to the post'
              className='post-img'
            />
          )}
          <p className='post-content'>
            {editing ? (
              <textarea
                className='edit-post-content'
                type='text'
                name='content'
                value={content}
                onChange={this.changeHandler}
              />
            ) : (
              content
            )}
          </p>
        </div>
        <div className='btn-cont'>
          {author_id === id ? (
            <input
              type='button'
              value='Delete'
              id='delete-btn'
              onClick={() => {
                this.props.location.state.deletePost(post_id)
              }}
            />
          ) : null}
          {author_id === id ? (
            editing ? (
              [
                <input
                  key='1'
                  type='button'
                  value='Cancel'
                  id='delete-btn'
                  onClick={this.toggleEdit}
                />,
                <input
                  key='2'
                  type='button'
                  value='Submit'
                  id='delete-btn'
                  onClick={this.editPost}
                />
              ]
            ) : (
              <input
                type='button'
                value='Edit'
                id='delete-btn'
                onClick={this.toggleEdit}
              />
            )
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Post)
