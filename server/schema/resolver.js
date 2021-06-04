
dummyOrgs = [
	{"id": 1, "name": "BSC"},
	{"id": 2, "name": "UnfoldingWord"}
]

const resolvers = {

	Query: {
		allOrgs: () => dummyOrgs
	}
}

module.exports.resolvers = resolvers
