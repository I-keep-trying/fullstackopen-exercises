import React from 'react'

const Total = ({ course }) => {
  const total = course.parts.reduce((a, v) => {
    return a + v.exercises
  }, 0)

  return (
    <div>
      <h3>Total of {total} exercises</h3>
    </div>
  )
}

export default Total
