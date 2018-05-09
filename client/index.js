/* global Spotify */
import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login.js'
import Library from './components/Library.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      hasAccess: false
    }
  }
  componentDidMount() {
    const accessToken = new URLSearchParams(location.search).get('access_token')
    if (typeof accessToken === 'string') {
      this.setState({
        hasAccess: true
      })
    }
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: 'My Spotify App',
        getOAuthToken: cb => {
          cb(this.state.accessToken)
        },
        volume: 0.1
      })

      player.addListener('initialization_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('authentication_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('account_error', ({ message }) => {
        console.error(message)
      })
      player.addListener('playback_error', ({ message }) => {
        console.error(message)
      })

      player.addListener('player_state_changed', state => {
        this.setState({
          songState: {
            name: state.track_window.current_track.name,
            artist: state.track_window.current_track.artists[0].name,
            image: state.track_window.current_track.album.images[1].url
          }
        })
      })

      player.connect()
    }
  }
  render() {
    return (
      <div className='App'>
        {this.state.hasAccess ? <Library /> : <Login />}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
