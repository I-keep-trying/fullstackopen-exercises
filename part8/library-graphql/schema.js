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
    author: Author
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
    user: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    allBooks(genre: String, title: String): [Book]
    findBook(title: String!): [Book]
    authorCount: Int!
    allAuthors: [Author]
    findAuthor(name: String!): Author
    allUsers: [User]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      genres: [String]
      author: String!
      setBornTo: Int
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String, setBornTo: Int, books: [String]): Author
    createUser(username: String!, favoriteGenre: String): User
    editUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`

module.exports = typeDefs
