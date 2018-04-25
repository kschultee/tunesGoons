import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login.js'

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Login />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
