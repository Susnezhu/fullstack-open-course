import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author: ID) {
    filtered: allBooks(genre: $genre, author: $author) {
      title
      published
      author {
        name
      }
      id
      genres
    }

    all: allBooks {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`


export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name,
        id
      }
      genres
      id
    }
  }
`


export const EDIT_AUTHOR = gql`
  mutation changeAuthor(
    $name: String!
    $setBornTo: Int!
  ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
    value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`