const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    allUsers(name: String): [User!]
    allRepos: [Repo!]
  }

  type User {
    id: ID!
    name: String
    repos: [Repo!]!
  }

  type Repo {
    id: ID!
    owner: User!
    name: String!
    description: String
    avatar_url: String
    html_url: String
  }
`

module.exports = typeDefs;