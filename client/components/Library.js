/* eslint-disable camelcase */

import React from 'react'
import Media from './Media.js'
import api from '../services/api.js'

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
      nextURL: ''
    }
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
  renderMore() {
    fetch('/library?url=' + this.state.nextURL + '&access_token=' + this.state.accessToken)
      .then(res => res.json())
      .then(data => {
        this.setState({
          library: [...this.state.library, data.items],
          nextURL: data.next
        })
      })
  }
  clickToPlay(songID) {
    api.transport('play', 'PUT', this.state.accessToken, JSON.stringify({'uris': [songID]}))
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
  }
  render() {
    const songList = Array.isArray(this.state.songs) && (
      <table className = 'table table-striped table-hover table-dark'>
        <thead>
          <tr>
            <th scope='col'>Song</th>
            <th scope='col'>Artist</th>
          </tr>
        </thead>
        <tbody>
          {this.state.library.map(sections => (
            sections.map(song => (
              <tr key={song.track.name} onClick={() => this.clickToPlay(song.track.uri)}>
                <th scope='row'>{song.track.name}</th>
                <td>{song.track.artists[0].name}</td>
              </tr>
            ))
          ))
          }
        </tbody>
      </table>
    )
    return (
      <div className='container'>
        <div>
          <h1 style={{color: '#fff'}}>Welcome to Your Library!</h1>
        </div>
        <div>
          {songList}
        </div>
        {this.state.nextURL &&
          <button type='button' className='btn' onClick={this.renderMore}>
            More
          </button>
        }
        <div className='buffer'></div>
        <Media songState={this.state.songState} getPlaybackState={this.getPlaybackState}/>
      </div>
    )
  }
}

export default Library
