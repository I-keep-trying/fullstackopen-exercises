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
    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) => Book.find({}).populate('author'),
    allAuthors: (root, args) => Author.find({}).populate('books'),
    findBook: (root, args) =>
      Book.findOne({ title: args.title }).populate('author', {
        name: 1,
        born: 1,
      }),
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      console.log('author', author)
      if (author === null) {
        author = new Author({ name: args.author })
        await author.save()
        console.log('savedAuthor', author)
      }
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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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
