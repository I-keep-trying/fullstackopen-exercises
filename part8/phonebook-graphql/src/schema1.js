const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link!]!
    link(id: ID!): Link
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

module.exports = typeDefs
