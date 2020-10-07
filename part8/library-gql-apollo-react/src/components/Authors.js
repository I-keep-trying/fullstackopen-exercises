import React from 'react'

const Authors = ({ authors, books }) => {
    authors = authors.data.allAuthors
  books = books.data.allBooks
  console.log('Authors component', authors)

  return (
    <div>
      <h2>Authors</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Born</th>
            <th scope="col">Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => {
            const books1 = books.filter((book) =>
              a.name === book.author.name ? book : null
            )
            return (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{books1.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
