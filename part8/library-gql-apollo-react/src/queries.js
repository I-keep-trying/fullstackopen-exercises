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

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    author {
      name
    }
    genres
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS_BY_GENRE = gql`
  query findBook($genreSelection: String) {
    allBooks(genre: $genreSelection) {
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
    $published: Int!
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
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
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
      user {
        username
        favoriteGenre
      }
    }
  }
`
export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
export const EDIT_USER = gql`
  mutation editUser($username: String!, $favoriteGenre: String) {
    editUser(username: $username, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre
    }
  }
`
