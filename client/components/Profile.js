import React from 'react'
import api from '../services/api.js'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: new URLSearchParams(location.search).get('access_token'),
      user: ''
    }
  }
  componentDidMount() {
    api.user(this.state.accessToken)
      .then(res => res.json())
  }
  render() {
    return this.state.user
  }
}

export default Profile
