const {gql} = require("apollo-server")

module.exports = gql`
 scalar JSON

type ProfileData {
	id:ID!
	bio:String
	social:JSON
	userId:ID!
	
}

input ProfileInput {
	bio:String
	social:JSON
}

type ProfileResponse {
	message:String!
	data:ProfileData!
}

extend type Mutation{
	updateUserProfile(profileInput:ProfileInput!):ProfileResponse!
}

`