import React from 'react'

class Media extends React.Component {
  constructor() {
    super()
    this.state = {
      accessToken: new URLSearchParams(location.search).get('access_token')
    }
    this.pause = this.pause.bind(this)
    this.play = this.play.bind(this)
  }
  pause() {
    fetch('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken
      }
    })
  }
  play() {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken
      }
    })
  }
  render() {
    return (
      <footer className='footer fixed-bottom'>
        <div className='container' style={{fontSize: '24px', color: '#fff'}}>
          <div className='media'>
            <img className='mr-3' src={this.props.songState.image}/>
            <div className='media-body'>
              <h5 className='mt-0'>{this.props.songState.name}</h5>
              <div className='artist'>
                {this.props.songState.artist}
              </div>
            </div>
            <div className='button-container'>
              <div onClick={this.play}>
                <i className='fas fa-play'></i>
              </div>
              <div onClick={this.props.back}>
                <i className='fas fa-step-backward'></i>
              </div>
              <div onClick={this.pause}>
                <i className='far fa-pause-circle'></i>
              </div>
              <div onClick={this.props.skip}>
                <i className='fas fa-step-forward'></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Media
