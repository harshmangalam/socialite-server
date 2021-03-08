const { GraphQLScalarType, Kind } = require('graphql');

module.exports = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return value // Convert incoming integer to Date
  },
 
});