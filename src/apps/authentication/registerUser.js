const bcrypt = require("bcrypt")
const { UserInputError } = require("apollo-server")


module.exports = async (_, { registerInput }, ctx) => {

    // data comming from frontend
    let { name, email, phoneNumber, password, username } = registerInput



    try {
        // check username duplication
        const checkUsername = await ctx.prisma.user.findUnique({
            where: {
                username
            }
        })

        if (checkUsername) {
            throw new UserInputError("USERNAME_ALREADY_EXISTS", {
                username: "Username already exists "
            })
        }






        // check email duplication

        if (email) {
            const checkEmail = await ctx.prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (checkEmail) {
                throw new UserInputError("EMAIL_ALREADY_EXISTS", {
                    email: "Email address already exists"
                })
            }
        }


        // check phone number duplication

        if (phoneNumber) {
            const checkPhone = await ctx.prisma.user.findUnique({
                where: {
                    phoneNumber
                }
            })

            if (checkPhone) {
                throw new UserInputError("PHONE_NUMBER_ALREADY_EXISTS", {
                    phoneNumber: "Phone Number already exists "
                })
            }

        }
        // hash password
        password = await bcrypt.hash(password, 6)



        // create new user
        const createUser = await ctx.prisma.user.create({
            data: {
                name,
                email,
                phoneNumber,
                password,
                username

            }
        })

        return {
            message: "User registered successfully",
            data: {
                userId: createUser.id
            }
        }


    } catch (err) {
        console.log(err)
        return err
    }

}