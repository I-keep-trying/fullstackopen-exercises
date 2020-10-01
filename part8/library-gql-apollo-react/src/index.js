import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App1'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4001',
  }),
})

/* const query = gql`
  query {
    allAuthors {
      name
      id
      born
    }
  }
`

client.query({ query }).then((response) => {
  console.log(response.data)
}) */

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
