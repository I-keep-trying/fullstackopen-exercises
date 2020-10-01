import React from 'react'

const Books = ({ books }) => {
  return (
    <div>
      <h2>Books</h2>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
