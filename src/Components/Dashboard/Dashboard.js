import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      search: '',
      userposts: true
    }
  }

  handleSearch = e => this.setState({ search: e.target.value })

  handleCheckbox = e => {
    this.setState({ userposts: e.target.checked })
    setTimeout(() => this.getPosts(), 0)
  }

  reset = () => {
    this.setState({ search: '', userposts: true })
    setTimeout(() => this.getPosts(), 0)
  }

  getPosts = () => {
    const { search, userposts } = this.state
    axios
      .get(`/api/posts?userposts=${userposts}&search=${search}`)
      .then(res => {
        this.setState({ posts: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  deletePost = postId => {
    axios.delete(`/api/post/${postId}`).then(res => {
      this.setState({ posts: res.data })
      this.props.history.push('/dashboard')
    })
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    const { search, userposts, posts } = this.state
    return (
      <div className='Dashboard'>
        <div className='search-cont'>
          <div className='search-bar-btns-cont'>
            <input
              type='text'
              name='search'
              value={search}
              className='search-bar'
              onChange={this.handleSearch}
              onKeyDown={e => (e.keyCode === 13 ? this.handleSearch(e) : null)}
            />
            <img
              src='/assets/img/search_logo.png'
              alt='search icon'
              id='search-btn'
              onClick={this.getPosts}
            />
            <input
              type='button'
              value='Reset'
              className='reset-btn'
              onClick={this.reset}
            />
          </div>
          <div className='my-post-cont'>
            <h3 className='my-posts'>My posts</h3>
            <input
              type='checkbox'
              name='userposts'
              id='userposts'
              checked={userposts}
              onChange={this.handleCheckbox}
            />
          </div>
        </div>
        <div className='posts-cont'>
          {posts.map(p => (
            <div className='post-cont' key={p.post_id}>
              <h2 className='post-title'>
                <Link
                  to={{
                    pathname: `/post/${p.post_id}`,
                    state: { deletePost: this.deletePost }
                  }}>
                  {p.title}
                </Link>
              </h2>
              <div className='author-cont'>
                <h4>by {p.author}</h4>
                <img
                  src={p.profile_pic}
                  alt='author profile pic'
                  className='author-img'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Dashboard)
