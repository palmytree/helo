import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import './Form.css'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      img: '',
      content: ''
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  submit = e => {
    e.preventDefault()
    const { title, img, content } = this.state

    axios
      .post(`/api/post`, { title, img, content })
      .then(() => {
        this.setState({ title: '', img: '', content: '' })
        this.props.history.push('/dashboard')
      })
      .catch(err => {
        alert('Oops! Something went wrong, check the console')
        console.log(err)
      })
  }

  render() {
    const { title, img, content } = this.state
    return (
      <div className='Form'>
        <form className='new-post' onSubmit={this.submit} >
          <h2>New Post</h2>
          <input
            type='text'
            name='title'
            value={title}
            id='post-title'
            onChange={this.handleChange}
            maxLength='45'
          />
          <img
            src={img ? img : '/assets/img/no_image.jpg'}
            alt='post pic preview'
          />
          <input
            type='url'
            value={img}
            name='img'
            id='post-img'
            onChange={this.handleChange}
          />
          <textarea
            type='textarea'
            value={content}
            name='content'
            id='post-content'
            onChange={this.handleChange}
          />
          <div className='post-btn-cont'>
            <input type='submit' value='Post' id='post-btn' />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Form)
