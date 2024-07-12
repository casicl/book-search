//login to execuse login mutation using apollo server
//add user execute add user mutation
//save book execute save book mutation
//remove book execute remove book mutation
import {gql} from "@apollo/client";

//mutation... hooks?
export const LOGIN = gql`
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
    newUser(username: $username, email: $email, passowrd: $password) {
    token
    user {
    _id
    username
    }}}`;

export const SAVE_BOOK = gql`
mutation saveBook($bookInfo: BookInfo!) {
_id
author
description
title
image
link
}`

export const DELETE_BOOK = gql`
mutation deletebook($bookId: ID!) {
deleteBook(bookId: $bookId) {
_id
author
description
title
image
link

}}

`