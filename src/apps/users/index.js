const {updateUserProfile} = require("./profile")
const {getUser,getAllUsers} = require("./fetchUser")


module.exports = {

	Query:{
		getUser,
		getAllUsers

	},
	
    Mutation:{
        updateUserProfile,

       
    }

}