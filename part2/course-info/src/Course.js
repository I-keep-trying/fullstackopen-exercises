import React from 'react'
import Header from './Header'
import Content from './Content'
//import Part from './Part'

const Course = ({course}) => {
  console.log('Course props', course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />

    </div>
  )
}

export default Course
