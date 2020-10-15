const {  PubSub, UserInputError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.genre) {
          return await Book.find({
            genres: { $in: [args.genre] },
          }).populate('author')
        }
        if (args.title) {
          return await Book.find({ title: args.title }).populate('author')
        }
        return Book.find({}).populate('author')
      },
      allAuthors: async (root, args) => {
        return await Author.find({}).populate('books')
      },
  
      findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
      me: async (root, args, context) => {
        return await context.currentUser
      },
    },
    Author: {
      bookCount: async (root, args) => {
        return await root.books.length
      },
    },
    Mutation: {
      addBook: async (root, args) => {
        if (args.author.length < 4) {
          throw new UserInputError(
            'Please enter author name, at least 4 characters.',
            {
              invalidArgs: args,
            }
          )
        }
  
        if (args.title.length < 2) {
          throw new UserInputError(
            'Please enter a title at least 2 characters.',
            {
              invalidArgs: args,
            }
          )
        }
  
        if (args.published === 0) {
          throw new UserInputError('Please enter published date.', {
            invalidArgs: args,
          })
        }
        let foundBookAuthor = await Author.findOne({ name: args.author })
        if (foundBookAuthor === null) {
          foundBookAuthor = new Author({ name: args.author })
        }
        let foundBook = await Book.findOne({ title: args.title })
        if (foundBook !== null) {
          throw new UserInputError('A book with this title already exists.', {
            invalidArgs: args,
          })
        }
        let book = new Book({ ...args, author: foundBookAuthor || newBookAuthor })
        foundBookAuthor.books = foundBookAuthor.books.concat(book._id)
        try {
          await foundBookAuthor.save()
          await book.save()
        } catch (error) {
          console.log('error new book', error)
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      addAuthor: async (root, args) => {
        const author = new Author({ ...args })
        const savedAuthor = await author.save()
        return savedAuthor
      },
      editAuthor: async (root, args, context) => {
        let author = await Author.findOne({ name: args.name })
        if (args.books) {
          author.books = author.books.concat(args.books)
        }
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
      createUser: async (root, args) => {
        const user = new User({ ...args })
  
        try {
          return await user.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
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
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
      },
    },
  }

  module.exports = resolvers