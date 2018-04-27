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
    let accessToken = new URLSearchParams(location.search).get('access_token')
    if (typeof accessToken === 'string') {
      this.setState({
        hasAccess: true
      })
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
