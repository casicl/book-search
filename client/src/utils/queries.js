//how to get me query to execute me query using apollo???
import {gql} from "@apollo/client";

export const QUERY_ME =gql`
{
_id
username
email
savedBooks {
    bookId
    author
    description
    title
    image
    link
    }
}`