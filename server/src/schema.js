const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    "Get tracks array for homepage grid"
    tracksForHome: [Track!]!
    allUsers(name: String): [User!]
    allRepos: [Repo!]
    getReposByOwner(id: ID!): [Repo!]!
  }

  type User {
    id: ID!
    name: String
  }

  type Repo {
    id: ID!
    owner: User!
    name: String!
    description: String
  }
`

module.exports = typeDefs;