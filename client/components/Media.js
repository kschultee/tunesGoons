import React from 'react'
import api from '../services/api.js'

class Media extends React.Component {
  constructor() {
    super()
    this.state = {
      accessToken: new URLSearchParams(location.search).get('access_token')
    }
    this.pause = this.pause.bind(this)
    this.play = this.play.bind(this)
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)
  }
  pause() {
    api.transport('pause', 'PUT', this.state.accessToken)
  }
  play() {
    api.transport('play', 'PUT', this.state.accessToken)
  }
  next() {
    api
      .transport('next', 'POST', this.state.accessToken)
      .then(() => this.props.getPlaybackState())
  }
  previous() {
    api
      .transport('pause', 'POST', this.state.accessToken)
      .then(() => this.props.getPlaybackState())
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
              <div onClick={this.previous}>
                <i className='fas fa-step-backward'></i>
              </div>
            </div>
            <div className='button-container'>
              <div onClick={this.pause}>
                <i className='far fa-pause-circle'></i>
              </div>
              <div onClick={this.next}>
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
