const { gql } = require('apollo-server');

let typeDefs = gql`
	type ComputerLanguage {
	   language: String
	 }
	 
	 type Subjects {
	   subject: String
	 }

	type User {
	   id: ID!
	   login: String!
	   name: String
	   fullName: String!
	   email: String!
	   avatarUrl: String
	   language: String
	   isAdmin: Boolean
	   lastLogin: String
	   created: String
	   repos: [Repo]
	 }

    type Repo {
	   id: ID!
	   owner: User!
	   name: String!
	   fullName: String!
	   description: String!
	   repoLanguages: [ComputerLanguage]
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

	type Organization {
	   id: ID!
	   login: String!
	   name: String!
	   website: String
	   location: String
	   email: String
	   avatarUrl: String
	   language: String
	   isAdmin: Boolean
	   lastLogin: String
	   created: String
	   teams: [Team]
	   members: [User]
	 }

	 type Team {
	 	id: ID!
	 	name: String
	 	description: String
	 	organization: Organization
	 	teamRepos: [Repo]
	 	teamType: String
	 	members: [User]

	 }

	 scalar TypelessData

	 type Catalog {
	 	metadataVersion: String
	 	metadata: TypelessData!
	 	repo: Repo!
	 	release: Release
	 	stage: Int
	 	branchOrTag: String!
	 	releaseDateUnix: String
	 }

	 type Release {
	 	title: String
	 	target: String
	 	note: String
	 	publisher: User
	 	originalAuthor: User
	 }

	type Query {
		allOrgs: [Organization]
		orgsByName: [Organization]
		user(name: String): User
		repo(repoName: String, userName: String): Repo
		reposByName(name: String): [Repo]
		catalog(repoName: String, userName: String, branchOrTag: String): Catalog
		catalogsByRepo(repoName: String): [Catalog]
		catalogsByOwner(userName: String): [Catalog]
	}
`;

module.exports.typeDefs = typeDefs
