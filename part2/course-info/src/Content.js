import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ course }) => {

  return (
    <div>
      {course.parts.map((part) => (
        <Part
          key={part.id}
          id={part.id}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      <Total course={course} />
    </div>
  )
}

export default Content
