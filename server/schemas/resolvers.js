const Users = require("../models/Users");
const Library = require("../models/Library");
const Songs = require("../models/Songs");

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      return await Users.findById(id).populate("libraries");
    },
    getAllUsers: async () => {
      return await Users.find().populate("libraries");
    },
    getLibraryById: async (_, { id }) => {
      return await Library.findById(id).populate("songs");
    },
    getAllLibraries: async () => {
      return await Library.find().populate("songs");
    },
    getSongById: async (_, { id }) => {
      return await Songs.findById(id);
    },
    getAllSongs: async () => {
      return await Songs.find();
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const user = new Users(input);
      await user.save();
      return user;
    },
    updateUser: async (_, { id, input }) => {
      return await Users.findByIdAndUpdate(id, input, { new: true }).populate(
        "libraries"
      );
    },
    deleteUser: async (_, { id }) => {
      return await Users.findByIdAndDelete(id);
    },
    createLibrary: async (_, { input }) => {
      const library = new Library(input);
      await library.save();
      return library;
    },
    updateLibrary: async (_, { id, input }) => {
      return await Library.findByIdAndUpdate(id, input, { new: true }).populate(
        "songs"
      );
    },
    deleteLibrary: async (_, { id }) => {
      return await Library.findByIdAndDelete(id);
    },
    createSong: async (_, { input }) => {
      const song = new Songs(input);
      await song.save();
      return song;
    },
    updateSong: async (_, { id, input }) => {
      return await Songs.findByIdAndUpdate(id, input, { new: true });
    },
    deleteSong: async (_, { id }) => {
      return await Songs.findByIdAndDelete(id);
    },
    addSongToLibrary: async (_, { libraryId, songId }) => {
      const library = await Library.findById(libraryId);
      library.songs.push(songId);
      await library.save();
      return library;
    },
    removeSongFromLibrary: async (_, { libraryId, songId }) => {
      const library = await Library.findById(libraryId);
      library.songs.pull(songId);
      await library.save();
      return library;
    },
  },
};

module.exports = resolvers;
