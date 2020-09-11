import React from 'react'
import axios from 'axios'
import Footer from './Footer'
import logo from './quote.svg'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anecdotes: [],
      current: 0,
    }
  }
  // componentDidMount = useEffect
  componentDidMount = () => {
    axios.get('http://localhost:3004/anecdotes').then((response) => {
      this.setState({ anecdotes: response.data })
    })
  }

  handleClick = () => {
    const current = Math.floor(Math.random() * this.state.anecdotes.length)
    this.setState({ current })
  }

  render() {
    if (this.state.anecdotes.length === 0) {
      return <div className="AppBody">no anecdotes...</div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Anecdotes
        </header>
        <div className="AppBody">
          <div>{this.state.anecdotes[this.state.current].content}</div>
          <button onClick={this.handleClick}>next</button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
