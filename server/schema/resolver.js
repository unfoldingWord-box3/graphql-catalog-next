
dummyOrgs = [
	{"id": 1, "name": "BSC"},
	{"id": 2, "name": "UnfoldingWord"}
]

const resolvers = {
	User: {
		repos(parent, args, {dataSources}){
			return dataSources.catalogNext.getReposByOwner(parent.id)
		}
	},

	Repo: {
		owner(parent, args, { dataSources }) {
			return dataSources.catalogNext.getUserById(parent.ownerId)
		}
	},

	Query: {
		allOrgs: () => dummyOrgs,
		user(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getUserByName(name)
		},
		repo(_, { repoName, userName }, { dataSources }) {
			return dataSources.catalogNext.getReposByNameAndOwner(repoName, userName)
		},
		reposByName(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getReposByName(name)
		}

	}
}

module.exports.resolvers = resolvers
