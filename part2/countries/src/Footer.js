import React from 'react'

const Footer = () => {
  return (
    <div className="App-footer">
      Developed by Andrea Crego 2020
      <a
        href="https://github.com/I-keep-trying/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {' '}
        <i style={{ color: 'white' }} className="fab fa-github"></i>
      </a>
      <br />
      Anecdote app for{' '}
      <a href="https://studies.helsinki.fi/courses/cur/hy-CUR-136379894">
        Full Stack Web Development{' '}
      </a>
      .
    </div>
  )
}

export default Footer
