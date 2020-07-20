import React from 'react'

const Part = ({exercises, name, id}) => {
  console.log('Part props', exercises, name, id)

  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  )
}

export default Part
