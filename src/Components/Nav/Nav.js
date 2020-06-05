import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { userToStore } from '../../dux/reducer'
import axios from 'axios'
import './Nav.css'

class Nav extends Component {
  logout = () => {
    axios.post('/api/auth/logout').then(() => {
      this.props.history.push('/')
    })
  }

  componentDidMount() {
    axios
      .get('/api/auth/user')
      .then(res => {
        const { id, username, profile_pic } = res.data
        this.props.userToStore(id, username, profile_pic)
      })
      .catch(() => {
        this.props.history.push('/')
      })
  }
  render() {
    const { profile_pic, username } = this.props
    return (
      <div className='Nav'>
        <div className='profile'>
          <img src={profile_pic} alt='profile pic' id='profile-pic' />
          <h2>{username}</h2>
        </div>
        <div className='nav-main'>
          <Link className='nav-link' to='/dashboard'>
            <img src='/assets/img/home_logo.png' alt='dashboard' />
          </Link>
          <Link className='nav-link' to='/new'>
            <img src='/assets/img/new_logo.png' alt='new post' />
          </Link>
        </div>
        <img
          src='/assets/img/shut_down.png'
          alt='logout'
          id='logout-btn'
          onClick={this.logout}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { userToStore })(withRouter(Nav))
