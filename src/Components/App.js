import React, { Component } from 'react'
import { withRouter } from 'react-router'
import routes from '../routes'
import Nav from './Nav/Nav'
import './reset.css'
import './App.css'

class App extends Component {
  render() {
    const { pathname } = this.props.location
    return (
      <div className='App'>
        {pathname === '/' ? null : (
          <div className='nav-cont'>
            <Nav />
          </div>
        )}
        <div className='route-cont'>{routes}</div>
      </div>
    )
  }
}

export default withRouter(App)
