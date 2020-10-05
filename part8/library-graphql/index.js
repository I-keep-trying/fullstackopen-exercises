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
    allBooks: (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author', {
          name: 1,
          born: 1,
        })
      }
      return Book.find({}).populate('author', {
        name: 1,
        born: 1,
      })
    },
    allAuthors: (root, args) => {
      return Author.find({}).populate('books')
    },
    findBook: (root, args) =>
      Book.find({ title: args.title }).populate('author', { name: 1, born: 1 }),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (author === null) {
        author = new Author({ name: args.author })
      }
      let book = new Book({ ...args, author })
      try {
        console.log('book', book) //this fires when no errors
        author = await author.save()
        book = await book.save()
      } catch (error) {
        console.log('add book book error', error) //this NEVER EVER EVER FIRES WHYYYYYYY
        //NOTHING PRINTS TO CONSOLE EVER!!!
        throw new UserInputError(error.message, {
          //code never even gets here.
          invalidArgs: args,
        })
      }
      return book
    },
    addAuthor: async (root, args) => {
      const books = await Book.find({ author: author })
      const author = new Author({ ...args, books: [books] })
      const savedAuthor = await author.save()
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
