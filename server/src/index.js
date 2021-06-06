const { ApolloServer, MockList } = require('apollo-server')
const typeDefs = require('./schema')

let dummyUsers = [
  {
   "id": 1,
   "login": "abelper8",
   "fullName" : "Abel Pérez",
   "repos": [
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
  },
  {
    "id": 2,
    "login": "mannycolon",
    "fullName" : "Manuel Colon",
    "repos": []
  },
  {
    "id": 3,
    "login": "kavitha",
    "fullName": "Kavitha",
    "repos": []
  },
  {
    "id": 4,
    "login": "j_aleksandrovich",
    "fullName": "Jakov Aleksandrovich",
    "repos": [
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

      }
    ]
  },
  {
    "id": 12,
    "login": "eli20",
    "fullName": "Eli Doe",
    "repos": []
    
  },
  {
    "id": 5,
    "login": "mike056",
    "fullName": "Mike P.",
    "repos": []
  }
]

let getAllRepos = () => { 
  const reposResult = []
  
  dummyUsers.forEach((user) => {
    user.repos.forEach(repo => {
      reposResult.push(repo)
    })
  })

  return reposResult
}

const resolvers = {
  Query: {
    allUsers: (parent, args, context, info) => {
      const result = args.name ? dummyUsers.filter(user => user.login.toLowerCase().includes(args.name.toLowerCase())) : dummyUsers
      return result
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
  `);
})