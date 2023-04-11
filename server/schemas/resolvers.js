const Users = require("../models/Users");
const Library = require("../models/Library");
const Songs = require("../models/Songs");
const { authMiddleware, signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUserById: async (_, { id }, context) => {
      return await Users.findById(id).populate("libraries");
    },
    getAllUsers: async (_, __, context) => {
      return await Users.find().populate("libraries");
    },
    getLibraryById: async (_, { id }, context) => {
      return await Library.findById(id).populate("songs");
    },
    getAllLibraries: async (_, __, context) => {
      return await Library.find().populate("songs");
    },
    getSongById: async (_, { id }, context) => {
      return await Songs.findById(id);
    },
    getAllSongs: async (_, __, context) => {
      return await Songs.find();
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = new Users(input);
      await user.save();
      return user;
    },
    updateLibrary: async (_, { id, input }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      return await Library.findByIdAndUpdate(id, input, { new: true }).populate(
        "songs"
      );
    },
    deleteLibrary: async (_, { id }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      return await Library.findByIdAndDelete(id);
    },
    createSong: async (_, { input }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      const song = new Songs(input);
      await song.save();
      return song;
    },
    updateSong: async (_, { id, input }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      return await Songs.findByIdAndUpdate(id, input, { new: true });
    },
    deleteSong: async (_, { id }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      return await Songs.findByIdAndDelete(id);
    },
    addSongToLibrary: async (_, { libraryId, songId }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      const library = await Library.findById(libraryId);
      library.songs.push(songId);
      await library.save();
      return library;
    },
    removeSongFromLibrary: async (_, { libraryId, songId }, context) => {
      const user = authMiddleware(context);
      if (!user) {
        throw new Error("You need to be logged in to perform this action.");
      }
      const library = await Library.findById(libraryId);
      library.songs.pull(songId);
      await library.save();
      return library;
    },
  },
};

module.exports = resolvers;
