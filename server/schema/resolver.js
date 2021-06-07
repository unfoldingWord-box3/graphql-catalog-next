const { GraphQLScalarType } = require('graphql');

dummyOrgs = [
	{"id": 1, "name": "BSC"},
	{"id": 2, "name": "UnfoldingWord"}
]
const GraphQlTypelessData = new GraphQLScalarType({
	name: "TypelessData",
	serialize(value) {
		result = JSON.parse(value)
		return result
	}
});

const resolvers = {
    TypelessData: GraphQlTypelessData,

	User: {
		repos(parent, args, {dataSources}){
			return dataSources.catalogNext.getReposByOwner(parent.id)
		}
	},

	Repo: {
		owner(parent, args, { dataSources }) {
			return dataSources.catalogNext.getUserById(parent.ownerId)
		},
		repoLanguages(parent, args, { dataSources }) {
			return dataSources.catalogNext.getLangsOfRepo(parent.id)
		},
		repoSubjects(parent, args, { dataSources }) {
			return dataSources.catalogNext.getRepoTopics(parent.id)
		},
		userPermissions(parent, args, { dataSources }) {
			return dataSources.catalogNext.getRepoAccess(parent.id)
		}
	},

	Access: {
		user(parent, args, { dataSources }) {
			return dataSources.catalogNext.getUserById(parent.userId)
		}
	},

	Organization: {
		teams(parent, args, { dataSources }) {
			return dataSources.catalogNext.getOrgTeams(parent.id)
		},
		members(parent, args, { dataSources }) {
			return dataSources.catalogNext.getOrgMembers(parent.id)
		}
	},

	Team: {
		teamRepos(parent, args, { dataSources }) {
			return dataSources.catalogNext.getTeamRepos(parent.id)
		},
		members(parent, args, { dataSources }) {
			return dataSources.catalogNext.getTeamMembers(parent.id)
		}
	},

	Catalog: {
		repo(parent, args, { dataSources }) {
			return dataSources.catalogNext.getRepoById(parent.repoId)
		},
		release(parent, args, { dataSources }) {
			return dataSources.catalogNext.getReleaseById(parent.releaseId)
		}
	},

	Release: {
		publisher(parent, args, { dataSources}) {
			return dataSources.catalogNext.getUserById(parent.publisherId)
		},
		originalAuthor(parent, args, { dataSources }) {
			return dataSources.catalogNext.getUserById(parent.originalAuthorId)
		}
	},

	Query: {
		allOrgs(_, args, { dataSources }) {
			return dataSources.catalogNext.getOrgUsers()
		},
		orgsByName(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getOrgsByName()
		},
		user(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getUserByName(name)
		},
		userSearch(_, { name }, { dataSources }) {
			return dataSources.catalogNext.searchUsers(name)
		},
		repo(_, { repoName, userName }, { dataSources }) {
			return dataSources.catalogNext.getRepoByNameAndOwner(repoName, userName)
		},
		reposByName(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getReposByName(name)
		},
		catalog(_, { repoName, userName, branchOrTag }, { dataSources }) {
			return dataSources.catalogNext.getOneCatalog(repoName, userName, branchOrTag)
		},
		catalogsByRepo(_, { repoName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByRepo(repoName)
		},
		catalogsByOwner(_, { userName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByOwner(userName)
		},
		catalogSearch(_, { searchWord }, { dataSources }) {
			return dataSources.catalogNext.searchCatalogs(searchWord)
		}

	}
}

module.exports.resolvers = resolvers
