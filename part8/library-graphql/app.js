const { ApolloServer, gql } = require('apollo-server')
const { find, filter } = require('lodash')
//const { makeExecutableSchema } = require('@graphql-tools/schema')

const authors = [
  { name: 1, firstName: 'Tom', lastName: 'Coleman' },
  { name: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { name: 3, firstName: 'Mikhail', lastName: 'Novikov' },
]

const posts = [
  { id: 1, author: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, author: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, author: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, author: 3, title: 'Launchpad is Cool', votes: 7 },
]

const typeDefs = gql`
  type Author {
    name: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(name: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: Int!): Post
  }
`

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { name }) => find(authors, { name }),
  },

  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId })
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`)
      }
      post.votes += 1
      return post
    },
  },

  Author: {
    posts: author => filter(posts, { author: author.name }),
  },

  Post: {
    author: post => find(authors, { name: post.author }),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = 4002

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
