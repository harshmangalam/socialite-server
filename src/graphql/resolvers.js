const authentication = require("../apps/authentication")
const users = require("../apps/users")
const dateScalar = require("../utils/dateScalar")
const jsonScalar = require("../utils/jsonScalar")


module.exports = {
	Date:dateScalar,
	JSON:jsonScalar,

    Query: {
        ...authentication.Query,
        ...users.Query
    },

    Mutation: {
    	
        ...authentication.Mutation,
        ...users.Mutation
    }
}
