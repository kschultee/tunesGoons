import React from 'react'

class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: {}
    }
  }
  componentDidMount() {
    const accessToken = new URLSearchParams(location.search).get('access_token')
    fetch('/library?access_token=' + accessToken)
      .then(res => res.json())
      .then(data =>
        this.setState({
          songs: data.items
        })
      )
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
          {this.state.songs.map(songs => (
            <tr key={songs.track.name}>
              <th scope='row'>{songs.track.name}</th>
              <td>{songs.track.artists[0].name}</td>
            </tr>
          ))}
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
      </div>
    )
  }
}

export default Library
