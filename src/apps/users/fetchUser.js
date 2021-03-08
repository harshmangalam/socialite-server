const {UserInputError} = require("apollo-server")

exports.getUser = async (_,args,ctx) => {
	try {
		const user = await ctx.prisma.user.findFirst({
			where:{
				id:Number(args.userId)
			},
			include:{
				profile:true
			}
		})

		if(!user){
			throw UserInputError("USER_NOT_FOUND",{
				general:"User not found"
			})
		}

		return user

	}catch (err){
		console.log(err)
		return err
	}
}



exports.getAllUsers = async (_,__,ctx) => {
	try {
		const users = await ctx.prisma.user.findMany({
			include:{
				profile:true
			}
		})

		

		return users

	}catch (err){
		console.log(err)
		return err
	}
}