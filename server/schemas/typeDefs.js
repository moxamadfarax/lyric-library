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

  input CreateUser {
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

  input UpdateUserInput {
    username: String
    email: String
    password: String
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
    createUser(input: CreateUser!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    createLibrary(input: CreateLibraryInput!): Library
    updateLibrary(id: ID!, input: CreateLibraryInput!): Library
    deleteLibrary(id: ID!): Library
    createSong(input: CreateSongInput!): Song
    updateSong(id: ID!, input: CreateSongInput!): Song
    deleteSong(id: ID!): Song
    addSongToLibrary(libraryId: ID!, songId: ID!): Library
    removeSongFromLibrary(libraryId: ID!, songId: ID!): Library
  }

  extend type User {
    library: Library
  }

  extend type Library {
    songs: [Song!]!
  }
`;

module.exports = typeDefs;
