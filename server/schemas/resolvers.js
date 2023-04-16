const Users = require("../models/Users");
const Library = require("../models/Library");
const Songs = require("../models/Songs");

const { signToken, authMiddleware, userCheck } = require("../utils/auth");

const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      return await Users.findById(id);
    },
    getAllUsers: async () => {
      return await Users.find();
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
    createUser: async function (_, { input }) {
      const { username, password, email } = input;
      const existingEmail = await Users.findOne({ email });
      const existingUsername = await Users.findOne({ username });
      const errors = userCheck(username, password, email);

      if (existingEmail) {
        throw new Error("Email already in use");
      }
      if (existingUsername) {
        throw new Error("Username has been taken");
      }
      if (errors) {
        console.log(errors);
        throw new Error(errors);
      }

      try {
        const user = await Users.create(input);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        return err;
      }
    },

    login: async function (parent, { email, password }) {
      const user = await Users.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Invalid credentials");
      }
      try {
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        return err;
      }
    },

    addLibraryToUser: async function (parent, { input }) {
      try {
        const library = await Library.create({
          ...input,
          user: context.user._id,
        });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { libraries: library._id } }
        );
        return library;
      } catch (err) {
        console.log(err);
      }
    },

    updateLibraryName: async function (parent, { id, name }) {
      try {
        const library = await Library.findOneAndUpdate(
          { _id: id, user: context.user._id },
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

    createLibrary: async (_, { input }, context) => {
      const library = new Library(input);
      await library.save();
      return library;
    },

    deleteLibrary: async function (parent, { id }, context) {
      try {
        const library = await Library.findOneAndDelete({
          _id: id,
          user: context.user._id,
        });
        await Users.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { libraries: id } }
        );
        if (!library) {
          throw new Error("Library not found");
        }
        return library;
      } catch (err) {
        console.log(err);
      }
    },

    addSongToLibrary: async function (parent, { libraryId, input }, context) {
      try {
        const library = await Library.findById(libraryId);
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

    removeSongFromLibrary: async function (
      parent,
      { libraryId, songId },
      context
    ) {
      context.auth.checkLoggedIn();
      try {
        const library = await Library.findById(libraryId).populate('songs');
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
        console.log(library);

        return library;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

module.exports = resolvers;
