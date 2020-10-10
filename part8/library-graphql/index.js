require('dotenv').config()
const fs = require('fs')
const {
  ApolloServer,
  ApolloError,
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
      console.log('allbooks query ', args)
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
    allUsers: () => User.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      try {
        let bookAuthor = await Author.findOne({ name: args.author })
        if (bookAuthor === null) {
          bookAuthor = new Author({ name: args.author })
          await bookAuthor.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
        let book = new Book({ ...args, author })
        if (args.published === 0) {
          throw new UserInputError('Please enter published date.')
        }
        await book.save()
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      const savedAuthor = await author.save()
      return savedAuthor
    },
    editAuthor: async (root, args, context) => {
      let author = await Author.findOne({ name: args.name })

      try {
        if (args.setBornTo === 0) {
          throw new UserInputError('Author date of birth required')
        } else {
          author.born = args.setBornTo
        }
        author = await author.save()
      } catch (error) {
        return error
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ ...args })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    editUser: async (root, args) => {
      let user = await User.findOne({ username: args.username })
      user.favoriteGenre = args.favoriteGenre
      try {
        user = await user.save()
      } catch (error) {
        return error
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Oops! Invalid username and/or password.')
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre || null,
        id: user._id,
      }
      return {
        value: jwt.sign(userForToken, JWT_SECRET),
        user: userForToken,
      }
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
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

const PORT = 4001

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
