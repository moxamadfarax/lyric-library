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
    owner: User!
    songs: [Song!]!
  }

  type Song {
    _id: ID!
    trackName: String!
    artistName: String!
    songPhoto: String!
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
    createdAt: String!
  }

  input CreateSongInput {
    trackName: String!
    artistName: String!
    songPhoto: String!
    lyrics: String!
  }

  type Query {
    getUserById(id: ID!): User
    getAllUsers: [User!]!
    getLibraryById(id: ID!): Library
    getAllLibraries: [Library!]!
    getSongById(id: ID!): Song
    getAllSongs: [Song!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    login(email: String!, password: String!): Auth
    addLibraryToUser(input: CreateLibraryInput!): Library
    createLibrary(input: CreateLibraryInput!): Library
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
