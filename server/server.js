const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/typedef.js');
const { resolvers } = require('./schema/resolver.js');
const { CatalogNext } = require('./schema/datasource.js')
const { dbConnection } = require('./schema/config.js')

// the database connetion details to be updated on deployment
const knexConfig = {
  client: 'mysql',
  connection: dbConnection
};

const db = new CatalogNext(knexConfig);


const server = new ApolloServer({ typeDefs, resolvers,  dataSources: () => ({catalogNext: db})});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

