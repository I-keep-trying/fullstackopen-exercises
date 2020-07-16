import React from 'react'

const Total = (props) => {
  console.log('Total props', props)
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.part1.exercises + props.part2.exercises + props.part3.exercises}
      </p>
    </div>
  )
}

export default Total
