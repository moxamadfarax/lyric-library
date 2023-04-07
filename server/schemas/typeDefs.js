const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    library: Library
  }

  type Library {
    _id: ID!
    name: String!
    songs: [Song!]!
  }

  type Song {
    _id: ID!
    trackName: String!
    artistName: String!
    songPhoto: String!
    lyrics: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input CreateLibraryInput {
    name: String!
  }

  input CreateSongInput {
    trackName: String!
    artistName: String!
    songPhoto: String!
    lyrics: String!
  }

  type Query {
    user(id: ID!): User
    library(id: ID!): Library
    song(id: ID!): Song
    users: [User!]!
    libraries: [Library!]!
    songs: [Song!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    createLibrary(input: CreateLibraryInput!): Library
    createSong(input: CreateSongInput!): Song
  }

  extend type User {
    library: Library
  }

  extend type Library {
    songs: [Song!]!
  }
`;

module.exports = typeDefs;
