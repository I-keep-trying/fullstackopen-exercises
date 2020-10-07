import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthorBd($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      id
      born
    }
  }
`

export const BOOKS_BY_AUTHOR = gql`
  query findBooksByAuthor($nameToSearch: String!) {
    booksByAuthor(name: $nameToSearch) {
      title
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      id
      author {
        name
      }
      genres
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBookItem(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`

export const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      id
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
