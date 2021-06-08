const { gql } = require('apollo-server');

let typeDefs = gql`
	type ComputerLanguage {
	   language: String
	   isPrimary: Boolean
	 }
	 
	 type Subjects {
	   name: String
	 }

	type Login {
		loginType: Int
		loginSource: Int
		loginName: String
	}

	type User {
	   id: ID!
	   login: Login!
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

	type Access {
		user: User
		mode: Int
	}

    type Repo {
	   id: ID!
	   owner: User!
	   name: String!
	   description: String!
	   repoLanguages: [ComputerLanguage]
	   repoSubjects: [Subjects]
	   userPermissions: [Access]
	   htmlUrl: String
	   sshUrl: String
	   cloneUrl: String
	   originalUrl: String
	   website: String
	   defaultBranch: String
	   isPrivate: Boolean
	   isMirror: Boolean
	   isFork: Boolean
	   isEmpty: Boolean
	   isArchieved: Boolean
	   isTemplate: Boolean
	   numStars: Int
	   numForks: Int
	   numWatches: Int
	   numPulls: Int
	   numClosedPulls: Int
	   numIssues: Int
	   numClosedIssues: Int
	   numMilestones: Int
	   numClosedMilestones: Int
	   numProjects: Int
	   numClosedProjects: Int
	   createdAt: String
	   updatedAt: String
	   avatarUrl: String
	 }

	type Organization {
	   id: ID!
	   login: Login!
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

	 type CatalogEntry {
	 	id: ID!
	 	metadataVersion: String
	 	metadata: TypelessData!
	 	repo: Repo
	 	release: Release
	 	stage: Int
	 	branchOrTag: String!
	 	releaseDateUnix: String
	 	books: [String]
	 	checkingLevel: String
	 }

	 type Release {
	 	id: ID!
	 	repo: Repo
	 	title: String
	 	target: String
	 	note: String
	 	publisher: User
	 	originalAuthor: User
	 }

	type Query {
		org(name: String): Organization
		user(name: String): User
		repo(repoName: String, userName: String): Repo
		release(repoName: String, userName: String, tagName: String): Release
		catalogEntry(repoName: String, userName: String, branchOrTag: String): CatalogEntry

		allOrgs: [Organization]
		allUsers: [User]
		allRepos: [Repo]
		allReleases: [Release]
		fullCatalog: [CatalogEntry]

		orgsSearch(name: String): [Organization]
		usersSearch(name: String): [User]
		reposSearch(name: String): [Repo]
		releasesSearch(name: String): [Release]
		catalogSearch(searchWord: String): [CatalogEntry]

		reposByName(name: String): [Repo]
		catalogByRepo(repoName: String): [CatalogEntry]
		catalogByOwner(userName: String): [CatalogEntry]
	}
`;

module.exports.typeDefs = typeDefs
