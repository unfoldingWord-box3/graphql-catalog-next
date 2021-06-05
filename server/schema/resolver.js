
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

	Query: {
		allOrgs(_, args, { dataSources }) {
			return dataSources.catalogNext.getOrgUsers()
		},
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
