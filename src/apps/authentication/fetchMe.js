const { AuthenticationError } = require("apollo-server")

module.exports = async (_,__,ctx) => {
    try {
    	const currentUser = ctx.currentUser
        if(!currentUser) throw new AuthenticationError("Invalid token login again")
       	const user = await ctx.prisma.user.findUnique({
       		where:{
       			id:Number(currentUser.id)
       		},
       		include:{
       			profile:true
       		}
       	})
        return user
    } catch (error) {
       console.log(error)
        return error

    }
}