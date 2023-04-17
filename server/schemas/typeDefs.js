const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    libraries: [Library!]!
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
    releaseDate: String
    lyrics: String!
  }

  type Auth {
    token: ID!
    user: User
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
    releaseDate: String
    lyrics: String!
  }

  type Query {
    getUserById(id: ID!): User
    getAllUsers: [User!]!
    getAllLibraries: [Library!]!
    getLibraryById(id: ID!): Library
    getSongById(id: ID!): Song
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    login(email: String!, password: String!): Auth
    createUserLibrary(userId: ID!, input: CreateLibraryInput!): Library
    updateLibraryName(id: ID!, name: String!): Library
    deleteLibrary(id: ID!): Library
    addSongToLibrary(libraryId: ID!, input: CreateSongInput!): Library
    removeSongFromLibrary(libraryId: ID!, songId: ID!): Library
  }

  extend type User {
    libraries: [Library!]!
  }

  extend type Library {
    songs: [Song!]!
  }
`;

module.exports = typeDefs;
