const { ApolloServer, UserInputError, gql } = require('apollo-server')
const typeDefs = require('./src/schema1')

const idDate = Date.now()//changes after server restart
let links = [
  {
    id: 'link-',//link-1601392700882
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(l => l.id === args.id),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = 4002

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at port ${url}`)
})
