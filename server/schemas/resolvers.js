const Users = require("../models/Users");
const Library = require("../models/Library");
const Songs = require("../models/Songs");

const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      return await Users.findById(id).populate("libraries");
    },
    getUserLibraries: async (_, { id }) => {
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
    getAllUsers: async () => {
      return await Users.find();
    },
    getAllLibraries: async () => {
      return await Library.find().populate("songs");
    },
  },
  Mutation: {
    createUser: async function (parent, { input }) {
      try {
        const user = await Users.create(input);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    login: async function (parent, { email, password }) {
      try {
        const user = await Users.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Invalid credentials");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Invalid credentials");
        }

        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    addLibraryToUser: async function (parent, { input }, context) {
      try {
        const library = await Library.create({
          ...input,
          user: context.user ? context.user._id : null,
        });
        if (context.user) {
          await Users.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { libraries: library._id } }
          );
        }
        return library;
      } catch (err) {
        console.log(err);
      }
    },
    updateLibraryName: async function (parent, { id, name }, context) {
      try {
        const library = await Library.findOneAndUpdate(
          { _id: id, user: context.user ? context.user._id : null },
          { name },
          { new: true }
        );
        if (!library) {
          throw new Error("Library not found");
        }
        return library;
      } catch (err) {
        console.log(err);
      }
    },
    deleteLibrary: async function (_, { libraryId }) {
      try {
        const library = await Library.findOneAndDelete({
          _id: id,
          user: context.user ? context.user._id : null,
        });
        if (context.user) {
          await Users.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { libraries: id } }
          );
        }
        if (!library) {
          throw new Error("Library not found");
        }
        return library;
      } catch (err) {
        console.log(err);
      }
    },
    createUserLibrary: async function (_, { userId, input }) {
      console.log(userId);
      try {
        const user = await Users.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const library = new Library(input);
        library.owner = userId;
        await library.save();
        user.libraries.push(library);
        await user.save();
        return library.populate("songs");
      } catch (err) {
        console.log(err);
      }
    },
    addSongToLibrary: async function (_, { libraryId, input }) {
      try {
        const library = await Library.findById(libraryId).populate("songs");
        if (!library) {
          throw new Error("Library not found");
        }

        const newSong = new Songs(input);
        await newSong.save();

        library.songs.push(newSong);
        await library.save();

        return library;
      } catch (err) {
        console.log(err);
      }
    },

    removeSongFromLibrary: async function (parent, { libraryId, songId }) {
      try {
        const library = await Library.findById(libraryId).populate("songs");
        if (!library) {
          throw new Error("Library not found");
        }

        const songIndex = library.songs.findIndex(
          (song) => song._id.toString() === songId
        );
        if (songIndex === -1) {
          throw new Error("Song not found in library");
        }

        library.songs.splice(songIndex, 1);
        await library.save();

        return library;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
