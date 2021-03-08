const register = require("./registerUser")
const login = require("./loginUser")
const changePassword = require("./changePassword")

const me = require("./fetchMe")

module.exports = {
    Query:{
        me
    },
    Mutation:{
        register,
        login,
        changePassword
    }

}