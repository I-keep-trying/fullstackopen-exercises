const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    name: String
    id: ID
    born: Int
    books: [Book]
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    findBook(title: String!): Book
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      genres: [String]
      author: String
      setBornTo: Int
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
  }
`

module.exports = typeDefs
