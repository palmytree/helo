import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { userToStore } from '../../dux/reducer'
import './Auth.css'

class Auth extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  register = () => {
    const { username, password } = this.state
    axios
      .post('/api/auth/register', { username, password })
      .then(res => {
        const { id, username, profile_pic } = res.data
        this.setState({ username: '', password: '' })
        this.props.userToStore(id, username, profile_pic)
        this.props.history.push('/dashboard')
      })
      .catch(err => alert(err.response.request.response))
  }

  login = () => {
    const { username, password } = this.state
    axios
      .post('/api/auth/login', { username, password })
      .then(res => {
        const { id, username, profile_pic } = res.data
        this.setState({ username: '', password: '' })
        this.props.userToStore(id, username, profile_pic)
        this.props.history.push('/dashboard')
      })
      .catch(err => alert(err.response.request.response))
  }

  render() {
    return (
      <div className='Auth'>
        <img src="/assets/img/helo_logo.png" alt="helo logo" className="helo-logo"/>
        <h1>Helo</h1>
        <div className="auth-form">
          <input
            type='text'
            placeholder='username'
            name='username'
            onChange={this.handleChange}
          />
          <input
            type='password'
            placeholder='password'
            name='password'
            onChange={this.handleChange}
          />
          <div className="form-btns">
            <input type='button' value='Login' onClick={this.login} />
            <input type='button' value='Register' onClick={this.register} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { userToStore })(Auth)
