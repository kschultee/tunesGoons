import React from 'react'

class Media extends React.Component {
  constructor() {
    super()
    this.state = {
      playbackState: {
        name: '',
        artist: '',
        image: ''
      }
    }
  }
  getPlaybackState() {
    const accessToken = new URLSearchParams(location.search).get('access_token')
    fetch('/playback?access_token=' + accessToken)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          playbackState: {
            name: res.item.name,
            artist: res.item.artists[0].name,
            image: res.item.album.images[2].url
          }
        })
      })
  }
  componentDidMount() {
    this.getPlaybackState()
  }
  render() {
    return (
      <footer className='footer fixed-bottom'>
        <div className='container' style={{fontSize: '24px', color: '#fff'}}>
          <div className='media'>
            <img className='mr-3' src={this.state.playbackState.image}/>
            <div className='media-body'>
              <h5 className='mt-0'>{this.state.playbackState.name}</h5>
              <div className='artist'>
                {this.state.playbackState.artist}
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Media
