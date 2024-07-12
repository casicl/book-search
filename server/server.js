//implement apollo server and apply it to express server as middleware
//i think this should work now??

const express = require('express');
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware}= require("@apollo/server/express4");
const { authMiddleware } = require('./utils/auth');

const {typeDefs, resolvers}= require("./schemas");
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
console.log(authMiddleware)
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/graphql', expressMiddleware(server, {
  //something is wrong with this, it works without it
  context: authMiddleware
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  })
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  console.log(`Use GraphQL at http:localhost:${PORT}/graphql`);
});
};

startApolloServer();
