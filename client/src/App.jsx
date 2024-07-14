//create apollo provider somehow, will always look like this
//default styling
import './App.css';
//set up links
import { Outlet } from 'react-router-dom';
//context, save queries, 
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import Navbar from './components/Navbar';

const backendLink=createHttpLink({uri:"/graphql"});
const auth = setContext((__, {headers})=> {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers, 
      authorization: token? `Bearer ${token}`:``
    }
  }
})



const client = new ApolloClient({
  link: auth.concat(backendLink),
   uri: "/graphql",
  cache: new InMemoryCache(),
});
function App() {
  
  return (

    //set up context, share resources, components have access to webtoken
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
