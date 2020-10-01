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
        console.log('author mutation', author)
        return author
      },
    },
  }
  