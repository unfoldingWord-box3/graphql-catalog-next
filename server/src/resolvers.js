const { GraphQLScalarType } = require('graphql');

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
			return dataSources.getReposByOwner(parent.id)
		}
	},

	Repo: {
		owner(parent, args, { dataSources }) {
			return dataSources.getUserById(parent.ownerId)
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
        userSearch(_, { name }, { dataSources }) {
            return dataSources.searchUsers(name)
        },
		user(_, { name }, { dataSources }) {
			return dataSources.getUserByName(name)
		},
		repo(_, { repoName, userName }, { dataSources }) {
			return dataSources.catalogNext.getReposByNameAndOwner(repoName, userName)
		},
		reposByName(_, { name }, { dataSources }) {
			return dataSources.getReposByName(name)
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
		},
        userById(_, { id }, { dataSources }){
            return dataSources.getUserById(id)
        }
	}
}

module.exports.resolvers = resolvers
