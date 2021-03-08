const {gql} = require("apollo-server")

module.exports = gql`

scalar Date

type Profile {
    id:ID!
    bio:String
    social:JSON 
    userId:ID!
}

type User {
    id:ID!
    name:String!
    email:String
    phoneNumber:String
    username:String!
    profile:Profile
    role:String!
    isActive:Boolean!
    createdAt:Date!
    updatedAt:Date!

}


type RegisterData {
    userId:ID!
}

type LoginData {
    userId:ID!
    token:String!
}


type RegisterResponse {
    message:String!
    data:RegisterData 
}

type LoginResponse {
    message:String!
    data:LoginData 
}


type PasswordChangeResponse {
    message:String!
    data:User
}

input RegisterInput {
    name:String!
    phoneNumber:String
    email:String
    username:String!
    password:String!

}

input LoginInput {
    phoneNumber:String
    email:String
    username:String
    password:String!

}



extend type Query {
    me:User!
}

extend type Mutation {

    register(registerInput:RegisterInput!):RegisterResponse!
    login(loginInput:LoginInput!):LoginResponse!
    changePassword(password:String!):PasswordChangeResponse!
    
}

`