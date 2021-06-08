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
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
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
		},
		createdAt(parent) {
			let a = new Date(parent.createdUnix * 1000)
			return `${a.getFullYear()} ${months[a.getMonth()]} ${a.getDate()}, ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()} ` 
		},
		updatedAt(parent) {
			let a = new Date(parent.updatedUnix * 1000)
			return `${a.getFullYear()} ${months[a.getMonth()]} ${a.getDate()}, ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()} ` 	
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

	CatalogEntry: {
		repo(parent, args, { dataSources }) {
			return dataSources.catalogNext.getRepoById(parent.repoId)
		},
		release(parent, args, { dataSources }) {
			return dataSources.catalogNext.getReleaseById(parent.releaseId)
		},
		books(parent, args, { dataSources }) {
			const meta = JSON.parse(parent.metadata)
			let books = []
			for (var i = meta.projects.length - 1; i >= 0; i--) {
				books.push(meta.projects[i].identifier)
			}
			return books
		},
		checkingLevel(parent) {
			const meta = JSON.parse(parent.metadata)
			return meta.checking.checking_level
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
		fullCatalog(_, args, { dataSources }) {
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
		catalogEntry(_, { repoName, userName, branchOrTag }, { dataSources }) {
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
		catalogSearch(_, { searchWord }, { dataSources }) {
			return dataSources.catalogNext.searchCatalogs(searchWord)
		},
		reposByName(_, { name }, { dataSources }) {
			return dataSources.catalogNext.getReposByName(name)
		},
		catalogByRepo(_, { repoName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByRepo(repoName)
		},
		catalogByOwner(_, { userName }, { dataSources }) {
			return dataSources.catalogNext.getCatalogsByOwner(userName)
		}

	}
}

module.exports.resolvers = resolvers
