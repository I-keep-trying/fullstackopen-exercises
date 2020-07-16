import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = () => {
    setGood(good + 1)
  }

  const countNeutral = () => {
    setNeutral(neutral + 1)
  }
  const countBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h3> give feedback</h3>
      <Button onClick={countGood} text="good" />
      <Button onClick={countNeutral} text="neutral" />
      <Button onClick={countBad} text="bad" />
      <h3>statistics</h3>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
