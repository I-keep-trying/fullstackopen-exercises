import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import {App, store} from './App'
import './index.css'
import './App.css'

/* const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {
  return (
    <div className="App">
      <header className="App-header">Counter App</header>
      <div>
        <div>{store.getState()}</div>
        <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
          plus
        </button>
        <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
          minus
        </button>
        <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
      </div>
    </div>
  )
} */

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})

store.subscribe(renderApp)

//ReactDOM.render(<App />, document.getElementById('root'));
