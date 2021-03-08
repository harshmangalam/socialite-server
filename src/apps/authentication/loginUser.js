const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserInputError } = require("apollo-server")

module.exports = async (_, { loginInput }, ctx) => {
    const { email, phoneNumber, username, password } = loginInput
    try {
        let user;

        // login user by email address
        if (email) {
            const checkEmail = await ctx.prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (!checkEmail) {
                throw new UserInputError("EMAIL_NOT_EXISTS", {
                    email: 'Email address not registered'
                })
            }

            user = checkEmail
        }


        // login user by username
        if (username) {
            const checkUsername = await ctx.prisma.user.findUnique({
                where: {
                    username
                }
            })

            if (!checkUsername) {
                throw new UserInputError("USERNAME_NOT_EXISTS", {
                    email: 'Username not registered'
                })
            }

            user = checkUsername
        }

        // login user by mobile number

        if (phoneNumber) {
            const checkPhone = await ctx.prisma.user.findUnique({
                where: {
                    phoneNumber
                }
            })

            if (!checkPhone) {
                throw new UserInputError("PHONE_NOT_EXISTS", {
                    email: 'Phone Number not registered'
                })
            }

            user = checkPhone
        }


        if (!user) {
            throw new UserInputError("USER_NOT_FOUND", {
                general: "User must be provide username/email/phone number"
            })
        }

        // check password

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            throw new UserInputError("INCORRECT_PASSWORD", {
                password: "Password must be correct"
            })
        }

        // generate jwt token

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "12h" })


        return {
            message: 'You have loggedin successfully',
            data: {
                userId: user.id,
                token
            }
        }


    } catch (error) {
        console.log(error)
        return error
    }
}