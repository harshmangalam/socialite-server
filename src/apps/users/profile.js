const { AuthenticationError } = require("apollo-server");

exports.updateUserProfile = async (_, { profileInput }, ctx) => {
	try {
		let currentUser = ctx.currentUser;
		if (!currentUser) {
			throw new AuthenticationError("Invalid token login again");
		}

		let { bio, social } = profileInput;

		//  check if profile for the user already exists

		const checkUserProfile = await ctx.prisma.profile.findFirst({
			where: {
				userId: Number(currentUser.id),
			},
		});

		let profile;

		// if profile already exists just update this otherwise create new one
		if (checkUserProfile) {
			bio = bio || checkUserProfile.bio;
			social = social || checkUserProfile.social;

			profile = await ctx.prisma.profile.update({
				where: {
					userId: currentUser.id,
				},
				data: {
					bio,
					social,
				},
				
			});
		} else {
			profile = await ctx.prisma.profile.create({
				data: {
					bio,
					social,
					userId:currentUser.id
				},
				
			});
		}

		return {
			message:"Profile; updated successfully",
			data:profile
		}
	} catch (e) {
		
		console.log(e);
		return e
	}
};
