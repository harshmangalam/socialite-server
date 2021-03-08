const { AuthenticationError } = require("apollo-server");

const bcrypt = require("bcrypt")

module.exports = async (_,args,ctx) => {
	try{
		const currentUser = ctx.currentUser
		if (!currentUser) {
			throw new AuthenticationError("Invalid token login again");
		}

		let {password} = args

		password = await bcrypt.hash(password,6)


		const user = await ctx.prisma.user.update({
			where:{
				id:Number(currentUser.id)
			},
			data:{
				password
			},
			include:{
				profile:true
			}
		})

		return {
			message:"Password changed successfully",
			data:user
		}




	}catch(err){
		console.log(err)
		return err
	}
}