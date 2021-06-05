const { ApolloServer, MockList } = require('apollo-server')
const typeDefs = require('./schema')

let dummyUsers = [
  {
   "id": 1,
   "name": "Abel",
   "repos": [
    {
      "id": 1,
      "name": "en_ta",
      "owner_id": 1,
      "description": "unfoldingWord® translationAcademy",
      "avatar_url": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
      "html_url": "https://git.door43.org/unfoldingWord/en_ta",
    },
    {
      "id": 2,
      "name": "en_tn",
      "owner_id": 1,
      "description": "unfoldingWord® translationNotes",
      "avatar_url": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
      "html_url": "https://git.door43.org/unfoldingWord/en_tn",
    },
   ]
  },
  {
    "id": 2,
    "name": "Manny",
    "repos": []
  },
  {
    "id": 3,
    "name": "Kavitha",
    "repos": []
  },
  {
    "id": 4,
    "name": "Alek",
    "repos": []
  },
  {
    "id": 12,
    "name": "Eliah",
    "repos": [
      {
        "id": 3,
        "name": "en_tq",
        "owner_id": 12,
        "description": "unfoldingWord® translationQuestions",
        "avatar_url": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "html_url": "https://git.door43.org/unfoldingWord/en_tq",

      },
      {
        "id": 4,
        "name": "en_tw",
        "owner_id": 12,
        "description": "unfoldingWord® translationWords",
        "avatar_url": "https://git.door43.org/repo-avatars/52426-7add887465de88f0d9d7051b426689fc",
        "html_url": "https://git.door43.org/unfoldingWord/en_tw",

      },
      {
        "id": 5,
        "name": "en_obs",
        "owner_id": 12,
        "description": "unfoldingWord® Open Bible Stories",
        "avatar_url": "https://filedn.com/lD0GfuMvTstXgqaJfpLL87S/assets/uw-icons/logo-obs-256.png",
        "html_url": "https://git.door43.org/unfoldingWord/en_obs",

      }
    ]
  },
  {
    "id": 5,
    "name": "Mike",
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
      const result = args.name ? dummyUsers.filter(user => user.name.toLowerCase().includes(args.name.toLowerCase())) : dummyUsers

      return result
    },
    allRepos: () => getAllRepos(),
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