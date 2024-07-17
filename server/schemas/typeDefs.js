//define query and mutation types
//query me user type
//mutation login, adduser, save book, remove book
//user type with id, username, email, bookcount, savedbooks array
//book type with id, author array, of strings, desc, title, image, link
//auth type with token and user referencing user type
//to do: what goes in arrays???

const typeDefs = `
    type Query {
    me: User
    }

    type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookInfo: BookInfo!): User
    deleteBook(bookId: ID!): User
    
    }

    input BookInfo {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
    }

    type User {
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
    
    }

    type Book {
    bookId: ID!
    authors: [String!]
    description: String
    title: String!
    image: String
    link: String
    

    }

    type Auth {
    token: ID!
    user: User

    }
    


`;
module.exports = typeDefs;