const { gql } = require('apollo-server');

const typeDefs = gql`
	type Organization{
		id: Int
		name: String
	}

	type Query {
		allOrgs: [Organization]
	}
`;

module.exports.typeDefs = typeDefs
