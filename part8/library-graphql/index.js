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
  },
  Book: {
    author: (root, args) => {
      return {
        name: root.name,
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      console.log('author', author)
      const book = new Book({ ...args, author })
      console.log('book', book)
      const savedBook = await book.save()
      console.log('savedBook', savedBook)
      return savedBook
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      const savedAuthor = await author.save()
      console.log('savedAuthor', savedAuthor)
      return savedAuthor
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
