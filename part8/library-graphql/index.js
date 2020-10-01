const { ApolloServer, gql } = require('apollo-server')

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = gql`
  type Author {
    name: String
    id: ID
    born: Int
    books: [Book]
    bookCount: Int
  }
  type Book {
    title: String
    published: Int
    id: ID
    genres: [String]
    author: Author
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

const resolvers = {
  Query: {
    bookCount: () => books.length,
    allBooks: (root, args) => {
      console.log('args', args)
      const byAuthor = book => (args.author === book.author ? book : !book)
      const byGenre = book => (book.genres.includes(args.genre) ? book : !book)
      if (Object.keys(args).length === 0) {
        return books
      } else if (args.author && args.genre) {
        const books1 = books.filter(byAuthor)
        return books1.filter(byGenre)
      } else if (args.author) {
        return books.filter(byAuthor)
      } else if (args.genre) {
        return books.filter(byGenre)
      }
    },
    findBook: (root, args) => books.find(b => b.title === args.title),
    authorCount: () => authors.length,
    allAuthors: () => authors,
    findAuthor: (root, args) => authors.find(a => a.name === args.name),
  },
  Author: {
    books: author => books.filter(book => book.author === author.name),
    bookCount: author =>
      books.filter(book => book.author === author.name).length,
  },
  Book: {
    author: book => authors.find(author => author.name === book.author),
  },
  Mutation: {
    addBook: (root, args) => {
      let author = authors.find(author => author.name === args.author)
      if (author === undefined) {
        const author = {
          name: args.author,
          id: Date.now(),
          born: args.setBornTo || null,
        }
        authors = authors.concat(author)
        const book = {
          title: args.title,
          published: args.published || null,
          id: Date.now(),
          genres: args.genres,
          author: args.author,
        }
        books = books.concat(book)
        return book
      } else {
        const book = { ...args, id: Date.now() }
        books = books.concat(book)
        return book
      }
    },
    editAuthor: (root, args) => {
      let author = authors.find(author => author.name === args.name)
      if (author === undefined) {
        return null
      }
      author = { ...author, born: args.setBornTo }
      console.log('author mutation',author)
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
