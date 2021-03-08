const { ApolloServer, AuthenticationError } = require("apollo-server")
const { PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const jwt = require("jsonwebtoken")


require("dotenv").config()
const authTypeDefs = require("./graphql/typeDefs/authTypes")
const baseTypeDefs = require("./graphql/typeDefs")
const profileTypeDefs = require("./graphql/typeDefs/profileTypes")
const userTypeDefs = require("./graphql/typeDefs/userTypes")

const resolvers = require("./graphql/resolvers");





const prisma = new PrismaClient();

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs: [baseTypeDefs, authTypeDefs,profileTypeDefs,userTypeDefs],
	resolvers,
	context: async ({ req }) => {

		let currentUser;
		const authHeader = req.headers.authorization || '';
		if (authHeader) {
			const token = authHeader.split("Bearer ")[1]
			if (token) {

				let { userId } = jwt.verify(token, process.env.JWT_SECRET)
				if (userId) {
					currentUser = await prisma.user.findUnique({
						where: {
							id: Number(userId)
						}
					})
				} else {
					throw new AuthenticationError("invalid token login again")
				}

			} else {
				throw new AuthenticationError("Invalid authentication token login again")
			}
		}

		return {
			pubsub,
			prisma,
			currentUser
		}


	},
	playground: true,
	cors: true,
})


async function main() {
	const { url, subscriptionsUrl } = await server.listen()
	console.log(`graphql server url ${url}`)
	console.log(`graphql subscription url ${subscriptionsUrl}`)
}


main().catch(err => console.log(`error from main ::: ${err}`))