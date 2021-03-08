const {gql} = require("apollo-server")

module.exports = gql`

extend type Query {
	getUser(userId:ID!):User!
	getAllUsers:[User]!
}

`