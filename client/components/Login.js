/* eslint-disable no-return-assign */
import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <header className='v-header container'>
        <div className='fullscreen-video-wrap'>
          <video src='/assets/bground.mov' autoPlay='true' loop='true' muted></video>
        </div>
        <div className='header-overlay'></div>
        <div className='header-content'>
          <h1>Welcome to tunesGoons</h1>
          <p>Please log in with Spotify to continue!</p>
          <button className='login' onClick={ () => window.location = 'http://localhost:3000/login'}>
            Log in
          </button>
        </div>
      </header>
    )
  }
}

export default Login
