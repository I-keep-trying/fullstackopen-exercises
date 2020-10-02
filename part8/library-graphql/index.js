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
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
  },
  /*   Author: {
    books: author => Book.findOne({author: author.name}),
    bookCount: {author => Book.collection.find({author: {$in:author.name}}).length},
  },
  Book: {
    author: book => Author.findOne({name: book.author}),
  }, */
  Book: {
    author: book => Author.collection.find({ name: book.author }),
  },
  Mutation: {
    addBook: async (root, args) => {
      return {
        genres: ['refactoring'],
        _id: '5f7791c42fa0de03f4338213',
        title: 'Clean Code1',
        published: 2008,
     auth o :re  {
          name: 'john doe',
          id: 'diuduiwdiw',
          born: 1,

          bookCount: 7,
        },
      }
      /*  let author = await Author.findOne({ name: args.author })
      let book
      if (author === null) {
        author = new Author({ name: args.author })
        try {
          author = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      try {
        book = new Book({ ...args, author })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      book = await await book.save()
      console.log('book...', book)
      return book */
      /*       const savedBook = await (await book.save())
        .populate('author', {
          name: 1,
        })
        .execPopulate()
      console.log('saved book', savedBook)
      return savedBook */
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
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
