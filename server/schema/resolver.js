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
		},
		avatarUrl(parent) {
			return `git.door43.org/user/avatar/${parent.lowerName}/290`
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
		},
		htmlUrl(parent) {
			return `git.door43.org/${parent.ownerName}/${parent.lowerName}/`
		},
		sshUrl(parent) {
			return `git@git.door43.org:${parent.ownerName}/${parent.lowerName}.git`
		},
		cloneUrl(parent) {
			return `git.door43.org/${parent.ownerName}/${parent.lowerName}.git`
		},
		avatarUrl(parent) {
			if (parent.avatar !== null && parent.avatar !== "") {
				return `git.door43.org/repo-avatars/${parent.avatar}`
			}
			return null
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
		},
		avatarUrl(parent) {
			return `git.door43.org/user/avatar/${parent.lowerName}/290`
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
		repo(parent, args, { dataSources }){
			return dataSources.catalogNext.getRepoById(parent.repoId)
		},
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
		allUsers(_, args, { dataSources }) {
			return dataSources.catalogNext.getAllUsers()
		},
		allRepos(_, args, { dataSources }) {
			return dataSources.catalogNext.getAllRepos()
		},
		allReleases(_, args, { dataSources }) {
			return dataSources.catalogNext.getAllReleases()
		},
		allCatalogs(_, args, { dataSources }) {
			return dataSources.catalogNext.getAllCatalogs()
		},
		org(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getOrgByName()
		},
		user(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getUserByName(name)
		},
		repo(_, { repoName, userName }, { dataSources }) {
			return dataSources.catalogNext.getRepoByNameAndOwner(repoName, userName)
		},
		release(_, { repoName, userName, tagName}, { dataSources }) {
			return dataSources.catalogNext.getRelease(repoName, userName, tagName)
		},
		catalog(_, { repoName, userName, branchOrTag }, { dataSources }) {
			return dataSources.catalogNext.getOneCatalog(repoName, userName, branchOrTag)
		},
		orgsSearch(_, { name }, { dataSources }) {
			return dataSources.catalogNext.searchOrgs(name)
		},
		usersSearch(_, { name }, { dataSources }) {
			return dataSources.catalogNext.searchUsers(name)
		},
		reposSearch(_, { name }, { dataSources }) {
			return dataSources.catalogNext.searchRepos(name)
		},
		releasesSearch(_, { name }, { dataSources }) {
			return dataSources.catalogNext.searchReleases(name)
		},
		catalogsSearch(_, { searchWord }, { dataSources }) {
			return dataSources.catalogNext.searchCatalogs(searchWord)
		},
		reposByName(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getReposByName(name)
		},
		catalogsByRepo(_, { repoName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByRepo(repoName)
		},
		catalogsByOwner(_, { userName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByOwner(userName)
		}

	}
}

module.exports.resolvers = resolvers
