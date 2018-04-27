import React from 'react'

class Library extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: {}
    }
  }
  componentDidMount() {
    fetch('/library')
      .then(res => res.json())
      .then(data =>
        this.setState({
          songs: data.items
        })
      )
  }
  render() {
    console.log(this.state.songs, Array.isArray(this.state.songs))
    const songList = Array.isArray(this.state.songs) ? (
      <div className = 'songList'>
        {this.state.songs.map(songs => (
          <div className='song' key={songs.track.name}>
            <h4>{songs.track.name}</h4>
          </div>
        ))}
      </div>
    ) : (
      null
    )
    return (
      <header className = 'v-header container'>
        <div className = 'header-content'>
          <p style={{color: 'black'}}>Welcome to Your Library!</p>
        </div>
        {songList}
      </header>
    )
  }
}

export default Library
