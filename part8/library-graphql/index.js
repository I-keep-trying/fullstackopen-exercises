require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const typeDefs = require('./schema')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
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
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log('currentUser', currentUser)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      } else {
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
        }
        return book
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      const savedAuthor = await author.save()
      return savedAuthor
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log('currentUser', currentUser)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      } else {
        let author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        try {
          author = await author.save()
        } catch (error) {
          //nope. never happens.
          console.log('error..........', error)
          throw new UserInputError(error)
        }
        return author
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      )
      return { currentUser }
    }
  },
})

const PORT = 4001

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
