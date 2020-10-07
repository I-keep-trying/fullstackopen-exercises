import React from 'react'

const Books = ({ books }) => {
  books = books.data.allBooks
  console.log('Books', books)
  const requests = [
    { id: 1, person: { id: 1 } },
    { id: 2, person: { id: 1 } },
    { id: 3, person: { id: 2 } },
    { id: 4, person: { id: 3 } },
    { id: 5, person: { id: 2 } },
  ]
  const result = [...new Set(requests.map(({ person: { id } }) => id))]
  console.log(result)
  const genreFilter = () => {}
  return (
    <div>
      <h2>Books</h2>
      <div>{books.map((book) => {
console.log('mapped book',book)

      })}</div>
      <table className="table">
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
