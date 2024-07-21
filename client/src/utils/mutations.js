//login to execute login mutation using apollo server
//add user execute add user mutation
//save book execute save book mutation
//remove book execute remove book mutation
import {gql} from "@apollo/client";

//mutation... hooks?
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
login(email: $email, password: $password) {
token
user {
_id
username
}

}
}`;

export const NEW_USER = gql`
mutation newUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }}}`;

export const SAVE_BOOK = gql`
mutation saveBook($bookInfo: BookInfo!) {
  saveBook(bookInfo: $bookInfo) {
    _id
    username
    email
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}`

export const DELETE_BOOK =gql`
mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      link
    }
  }
}`

// export const DELETE_BOOK = gql`
// mutation deleteBook($bookId: ID!) {
//   deleteBook(bookId: $bookId) {
//     _id
// author
// description
// title
// image
// link

// }}

// `