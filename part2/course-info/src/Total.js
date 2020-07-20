import React from 'react'

const Total = (props) => {
  console.log('Total props', props)

  const total = props.parts.reduce((a, v) => {
    return a + v.exercises
  }, 0)
  
  return (
    <div>
{/*       <p>Total number of exercises: {total}</p> */}
    </div>
  )
}

export default Total
