require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Person = require('./models/person')
const User = require('./models/user')
const typeDefs = require('./schema')

const pubsub = new PubSub()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET
console.log('connecting to', MONGODB_URI)

mongoose.set('debug', true)

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
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        const noPhone = await Person.find({}).populate('friendOf')
        // console.log('noPhone', noPhone)
        return noPhone
      }
      const hasPhone = await Person.find({
        phone: { $exists: args.phone === 'YES' },
      }).populate('friendOf')
      //  console.log('hasPhone', hasPhone)
      return hasPhone
    },
    findPerson: (root, args) =>
      Person.findOne({ name: args.name }).populate('friendOf'),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Person: {
    address: root => {
      return {
        street: root.street,
        city: root.city,
      }
    },
    friendOf: async root => {
      const friends = await User.find({
        friends: {
          $in: [root._id],
        },
      })

      return friends
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      let person = await Person.findOne({ name: args.name })
      if (person === null) {
        person = new Person({ ...args })
      } else if (person.name === args.name) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name,
        })
      }
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        console.log('add person error ', error.message)

        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('PERSON_ADDED', { personAdded: person })
      return person
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        console.log('edit  number error ', error.message)

        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return person
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
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ii4uLiIsImlkIjoiNWY3NjM2YjZkZWU3NzEwYTc4NDJhYmZhIiwiaWF0IjoxNjAyMDA4ODQ2fQ.FTz0Lh-oX7yl-YYBvvGP6GBOdiD0uNmT3O99YQvyKJg"
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = person =>
        !currentUser.friends.map(f => f._id).includes(person._id)

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const person = await Person.findOne({ name: args.name })
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['PERSON_ADDED']),
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

const PORT = 4003

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
