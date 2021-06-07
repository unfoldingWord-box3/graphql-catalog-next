const { ApolloServer, MockList } = require('apollo-server')
const {catalogNext} = require('./datasource.js')
const { resolvers } = require('./resolvers.js')
const typeDefs = require('./schema')



// const resolvers = {
//   Query: {
//     allUsers: (parent, args, context, info) => {
//       const result = args.name ? dummyUsers.filter(user => user.login.toLowerCase().includes(args.name.toLowerCase())) : dummyUsers
//       return result
//     }
//   }
// }

const server = new ApolloServer({ typeDefs, resolvers, dataSources: () => (catalogNext) })

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
})