const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/typedefs.js');
const { resolvers } = require('./schema/resolver.js');
const { CatalogNext } = require('./schema/datasource.js')

// the database connetion details to be updated on deployment
const knexConfig = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'password',
    database : 'dcs'
  }
};

const db = new CatalogNext(knexConfig);


const server = new ApolloServer({ typeDefs, resolvers,  dataSources: () => ({catalogNext: db})});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
