import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Statistic = ({ text, text2, value }) => {
  return (
    <>
      <tr>
        <td>
          {text}: {value} {text2}
        </td>
      </tr>
    </>
  )
}

const Statistics = ({ good, neutral, bad, avg, all, positive }) => {
  return (
    <>
      <h3>statistics</h3>
      <table width="50%" border="0px">
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="Total Votes" value={all} />
          <Statistic text="Average" value={avg()} />
          <Statistic text="Positive " value={positive()} text2="%" />
        </tbody>
      </table>
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const avg = () => {
    if (all === 0) {
      return 0
    } else {
      return ((good + neutral * 0 - bad) / all).toFixed(2)
    }
  }

  const positive = () => {
    if (all === 0) {
      return 0
    } else {
      return ((good / all) * 100).toFixed(2)
    }
  }

  return (
    <div>
      <h3> give feedback</h3>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      {all > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          avg={avg}
          positive={positive}
        />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
