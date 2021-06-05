const { gql } = require('apollo-server');

const typeDefs = gql`
	type Organization{
		id: Int
		name: String
	}

	type Languages {
	   language: String
	 }
	 
	 type Subjects {
	   subject: String
	 }

	type User {
	   id: ID!
	   login: String!
	   fullName: String!
	   email: String!
	   avatarUrl: String
	   language: String
	   isAdmin: Boolean
	   lastLogin: String
	   created: String
	   # repoLanguages: [Languages]
	   # repoSubjects: [Subjects]
	   username: String!
	   repos: [Repo]
	 }

    type Repo {
	   id: ID!
	   owner: User!
	   name: String!
	   fullName: String!
	   description: String!
	   repoLanguages: [Languages]
	   repoSubjects: [Subjects]
	   empty: Boolean
	   private: Boolean
	   fork: Boolean
	   template: Boolean
	   mirror: Boolean
	   size: Int
	   htmlUrl: String
	   sshUrl: String
	   cloneUrl: String
	   originalUrl: String
	   website: String
	   starsCount: Int
	   forksCount: Int
	   watchersCount: Int
	   openIssues_count: Int
	   openPrCounter: Int
	   releaseCounter: Int
	   defaultBranch: String
	   archived: Boolean
	   createdAt: String
	   updatedAt: String
	   #permissions: Permissions
	   hasIssues: Boolean,
	   avatarUrl: String
	   language: String
	   subject: String
	   books: String
	   title: String
	   checkingLevel: String
	 }


	type Query {
		allOrgs: [Organization]
		user(name: String): User
		repo(repoName: String, userName: String): Repo
		reposByName(name: String): [Repo]
	}
`;

module.exports.typeDefs = typeDefs
