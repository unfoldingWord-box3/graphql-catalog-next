const { ApolloServer, MockList } = require('apollo-server')
const typeDefs = require('./schema')

let dummyUsers = [
 {"id": 1, "name": "Abel"},
 {"id": 2, "name": "Manny"},
 {"id": 3, "name": "Kavitha"},
 {"id": 4, "name": "Alek"},
 {"id": 12, "name": "Eliah"},
 {"id": 5, "name": "Mike"}
]

let dummyRepos = [
  {"id": 1, "name": "en_ta", "owner_id": 1, "description": ""},
  {"id": 2, "name": "en_tn", "owner_id": 1, "description": ""},
  {"id": 3, "name": "en_tq", "owner_id": 12, "description": ""},
  {"id": 4, "name": "en_tw", "owner_id": 12, "description": ""},
  {"id": 5, "name": "en_obs", "owner_id": 12, "description": ""}
]

let addReposOwners = () => { 
  const Repos = dummyRepos.map( repo => {
    repo.owner = dummyUsers.find( owner => repo.owner_id === owner.id)
    return repo
  })
  return Repos
}

const resolvers = {
  Query: {
    allUsers: (parent, args, context, info) => args.name ? dummyUsers.filter( user => user.name.includes(args.name)) : dummyUsers,
    allRepos: () => addReposOwners(),
    getReposByOwner: (parent, args, context, info) => {
      Repos = addReposOwners()
      return Repos.filter( repo => repo.owner.id == args.id)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
})