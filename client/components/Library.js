/* eslint-disable camelcase */
/* global Spotify */

import React from 'react'
import Media from './Media.js'

class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: {},
      accessToken: new URLSearchParams(location.search).get('access_token'),
      songState: {
        name: '',
        artist: '',
        image: ''
      },
      library: [],
      isMore: true,
      nextURL: ''
    }
    this.transport = this.transport.bind(this)
    this.getPlaybackState = this.getPlaybackState.bind(this)
    this.renderMore = this.renderMore.bind(this)
    this.clickToPlay = this.clickToPlay.bind(this)
  }
  getPlaybackState() {
    fetch('/playback?access_token=' + this.state.accessToken)
      .then(res => res.json())
      .then((res) => {
        this.setState({
          songState: {
            name: res.item.name,
            artist: res.item.artists[0].name,
            image: res.item.album.images[2].url
          }
        })
      })
  }
  transport(endpoint) {
    fetch('https://api.spotify.com/v1/me/player/' + endpoint, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken
      }
    })
      .then(() => new Promise(resolve => setTimeout(resolve, 500)))
      .then(() => this.getPlaybackState())
  }
  renderMore() {
    fetch('/library?url=' + this.state.nextURL + '&access_token=' + this.state.accessToken)
      .then(res => res.json())
      .then(data => {
        if (data.next === null) {
          this.setState({
            library: [...this.state.library, data.items],
            isMore: false
          })
        }
        else {
          this.setState({
            library: [...this.state.library, data.items],
            nextURL: data.next
          })
        }
      })
  }
  clickToPlay(songID) {
    fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.state.accessToken
      },
      body: JSON.stringify({'uris': [songID]})
    })
      .then(() => new Promise(resolve => setTimeout(resolve, 500)))
      .then(() => this.getPlaybackState())
  }
  componentDidMount() {
    this.getPlaybackState()
    fetch('/library?url=https://api.spotify.com/v1/me/tracks?offset=0&limit=50' + '&access_token=' + this.state.accessToken)
      .then(res => res.json())
      .then(data => {
        if (data.next === null) {
          this.setState({
            songs: data.items,
            isMore: false
          })
        }
        else {
          this.setState({
            songs: data.items,
            library: [...this.state.library, data.items],
            nextURL: data.next
          })
        }
      })
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
    const songList = Array.isArray(this.state.songs) ? (
      <table className = 'table table-striped table-hover table-dark'>
        <thead>
          <tr>
            <th scope='col'>Song</th>
            <th scope='col'>Artist</th>
          </tr>
        </thead>
        <tbody>
          {this.state.library.map(songs => (
            songs.map(songs => (
              <tr key={songs.track.name} onClick={() => this.clickToPlay(songs.track.uri)}>
                <th scope='row'>{songs.track.name}</th>
                <td>{songs.track.artists[0].name}</td>
              </tr>
            ))
          ))
          }
        </tbody>
      </table>
    ) : (
      null
    )
    return (
      <div className='container'>
        <div>
          <h1 style={{color: '#fff'}}>Welcome to Your Library!</h1>
        </div>
        <div>
          {songList}
        </div>
        {this.state.isMore &&
          <button type='button' className='btn' onClick={this.renderMore}>
            More
          </button>
        }
        <div className='buffer'></div>
        <Media songState={this.state.songState} transport={this.transport}/>
      </div>
    )
  }
}

export default Library
