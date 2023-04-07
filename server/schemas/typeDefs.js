const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Users {
    _id: ID
    name: String
    email: String
    password: String
    libraries: [String]!
  }

  }
`;

module.exports = typeDefs;
