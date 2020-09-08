import React from 'react'

const Footer = () => {
  return (
    <div className="App-footer">
      Developed by Andrea Crego 2020
      <a
        href="https://github.com/I-keep-trying/fullstackopen-exercises/tree/master/part7/counter-custom-hooks"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        <i style={{ color: 'white' }} class="fab fa-github"></i>
      </a>
      <br />
      Counter app for{' '}
      <a href="https://studies.helsinki.fi/courses/cur/hy-CUR-136379894">
        Full Stack Web Development{' '}
      </a>
      .
    </div>
  )
}

export default Footer
