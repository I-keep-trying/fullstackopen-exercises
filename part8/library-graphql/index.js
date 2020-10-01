require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const typeDefs = require('./schema')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => Book.find({}),
    findBook: (root, args) => Book.findOne({ title: args.title }),
    authorCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) => authors.find(a => a.name === args.name),
  },
/*   Author: {
    books: author => books.filter(book => book.author === author.name),
    bookCount: author =>
      books.filter(book => book.author === author.name).length,
  },
  Book: {
    author: book => authors.find(author => author.name === book.author),
  }, */
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      console.log('book mutation', book)
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: (root, args) => {
      let author = authors.find(author => author.name === args.name)
      if (author === undefined) {
        return null
      }
      author = { ...author, born: args.setBornTo }
      console.log('author mutation', author)
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = 4001

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
