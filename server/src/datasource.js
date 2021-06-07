
let dummyUsers = [
    {
     "id": 1,
     "login": "abelper8",
     "fullName" : "Abel Pérez",
    },
    {
      "id": 2,
      "login": "mannycolon",
      "fullName" : "Manuel Colon",
    },
    {
      "id": 3,
      "login": "kavitha",
      "fullName": "Kavitha",
    },
    {
      "id": 4,
      "login": "j_aleksandrovich",
      "fullName": "Jakov Aleksandrovich",
    },
    {
      "id": 12,
      "login": "eli20",
      "fullName": "Eli Doe",     
    },
    {
      "id": 5,
      "login": "mike056",
      "fullName": "Mike P.",
    }
]

let dummyRepos = [
    {
        "id": 3,
        "name": "en_tq",
        "ownerId": 12,
        "description": "unfoldingWord® translationQuestions",
        "avatarUrl": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "htmlUrl": "https://git.door43.org/unfoldingWord/en_tq",
    },
    {
        "id": 4,
        "name": "en_tw",
        "ownerId": 12,
        "description": "unfoldingWord® translationWords",
        "avatarUrl": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "htmlUrl": "https://git.door43.org/unfoldingWord/en_tw",
    },
    {
        "id": 5,
        "name": "en_obs",
        "ownerId": 12,
        "description": "unfoldingWord® Open Bible Stories",
        "avatarUrl": "https://filedn.com/lD0GfuMvTstXgqaJfpLL87S/assets/uw-icons/logo-obs-256.png",
        "htmlUrl": "https://git.door43.org/unfoldingWord/en_obs",
    },
    {
        "id": 1,
        "name": "en_ta",
        "ownerId": 1,
        "description": "unfoldingWord® translationAcademy",
        "avatarUrl": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "htmlUrl": "https://git.door43.org/unfoldingWord/en_ta",
    },
    {
        "id": 2,
        "name": "en_tn",
        "ownerId": 1,
        "description": "unfoldingWord® translationNotes",
        "avatarUrl": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "htmlUrl": "https://git.door43.org/unfoldingWord/en_tn",
    },
]
  
const catalogNext = {

  getUserByName(name) {
    const result = name ? dummyRepos.filter(user => user.login.toLowerCase().includes(name.toLowerCase())) : null
    return result[0]
  },

  getReposByName(name) {
    const result = name ? dummyRepos.filter(repo => repo.name.toLowerCase().includes(name.toLowerCase())) : null
    return result
  },

  searchUsers(name) {
    const result = name ? dummyUsers.filter(user => user.login.toLowerCase().includes(name.toLowerCase())) : null
    return result
  },

  getReposByNameAndOwner(repoName, userName) {

  },

  getReposByOwner(ownerId) {
    const result = ownerId ? dummyRepos.filter(repo => repo.ownerId === ownerId) : null
    //console.log(result)
    return result
  },

  getRepoById(repoId) {

  },

  getUserById(userId) {
    const result = userId ? dummyUsers.filter(user => user.id == userId)  : null
    return result[0]
  },

  getOrgUsers() {

    
  },

  getOrgTeams(orgUserId) {

    
  },

  getOrgMembers(orgUserId) {

    
  },

  getTeamMembers(teamId) {

    
  },

  getTeamRepos(teamId) {

    
  },

  getOrgsByname(name) {

    
  },

  getOneCatalog(repoName, userName, branchOrTag) {

  },

  getCatalogsByRepo(repoName) {

  },

  getCatalogsByOwner(userName) {

  },

  getReleaseById(id){

  },

  searchCatalogs(searchWord) {

  },

}

module.exports.catalogNext = catalogNext
