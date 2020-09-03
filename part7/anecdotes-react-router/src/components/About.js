import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const About = ({ setLocation }) => {
  let history = useHistory()
  useEffect(() => {
    setLocation(history.location.pathname)
  }, [setLocation])

  return (
    <div>
      <div>According to Wikipedia:</div>
      <br />
      <div>
        <i>
          An anecdote is a brief, revealing account of an individual person or
          an incident. Occasionally humorous, anecdotes differ from jokes
          because their primary purpose is not simply to provoke laughter but to
          reveal a truth more general than the brief tale itself, such as to
          characterize a person by delineating a specific quirk or trait, to
          communicate an abstract idea about a person, place, or thing through
          the concrete details of a short narrative. An anecdote is "a story
          with a point."
        </i>
      </div>
      <br />

      <div>
        Software engineering is full of excellent anecdotes, at this app you can
        find the best and add more.
      </div>
    </div>
  )
}

export default About
