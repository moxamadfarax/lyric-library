const { gql } = require("apollo-server-express");

const typeDefs = gql`
// Type definitions

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
  songs: [Song]!
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

// Resolvers

const resolvers = {
  Query: {
    // Get a user by ID
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id).populate('library')
    },
    // Get a library by ID
    library: async (parent, { id }, { models }) => {
      return await models.Library.findById(id).populate('songs')
    },
    // Get a song by ID
    song: async (parent, { id }, { models }) => {
      return await models.Song.findById(id)
    },
    // Get all users
    users: async (parent, args, { models }) => {
      return await models.User.find().populate('library')
    },
    // Get all libraries
    libraries: async (parent, args, { models }) => {
      return await models.Library.find().populate('songs')
    },
    // Get all songs
    songs: async (parent, args, { models }) => {
      return await models.Song.find()
    },
  },
  Mutation: {
    // Create a user
    createUser: async (parent, { input }, { models }) => {
      const user = new models.User(input)
      await user.save()
      return user
    },
    // Create a library
    createLibrary: async (parent, { input }, { models }) => {
      const library = new models.Library(input)
      await library.save()
      return library
    },
    // Create a song
    createSong: async (parent, { input }, { models }) => {
      const song = new models.Song(input)
      await song.save()
      return song
    },
  },
  User: {
    // Get the library for a user
    library: async (user, args, { models }) => {
      return await models.Library.findById(user.library)
    },
  },
  Library: {
    // Get the songs for a library
    songs: async (library, args, { models }) => {
      return await models.Song.find({ _id: { $in: library.songs } })
    },
  },
}

`;

module.exports = typeDefs;
