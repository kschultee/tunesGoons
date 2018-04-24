/* eslint-disable no-return-assign */
import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <div className='Begin'>
        Hello, please log in with Spotify
        <button className='login' onClick={ () => window.location = 'http://localhost:300/login'}>
          Log in
        </button>
      </div>
    )
  }
}

export default Login
