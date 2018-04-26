import React from 'react'

class Landing extends React.Component {
  componentDidMount() {
    let accessToken = new URLSearchParams(location.search).get('access_token')
    console.log(accessToken)
  }
  render() {
    return (
      <header className = 'v-header container'>
        <div className = 'header-content'>
          <p style={{color: 'black'}}>Welcome to Your Library!</p>
        </div>
      </header>
    )
  }
}

export default Landing
