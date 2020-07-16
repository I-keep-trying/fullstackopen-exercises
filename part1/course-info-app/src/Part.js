import React from 'react'

const Part = (props) => {
    console.log('Part props', props)
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

export default Part
