import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login.js'
import Landing from './components/Landing.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAccess: false
    }
  }
  render() {
    return (
      <div className='App'>
        {this.state.hasAccess ? <Landing /> : <Login />}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
