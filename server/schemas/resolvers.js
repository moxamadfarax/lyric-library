const Users = require("../models/Users");
const Library = require("../models/Library");
const Songs = require("../models/Songs");
const { signToken, userCheck } = require("../utils/auth");
const resolvers = {
  Query: {
    getUserById: async (_, { id }) => {
      return await Users.findById(id).populate("libraries");
    },
    getLibraryById: async (_, { id }) => {
      return await Library.findById(id).populate("songs");
    },
    getSongById: async (_, { id }) => {
      return await Songs.findById(id);
    },
    getAllUsers: async () => {
      return await Users.find().populate("libraries");
    },
    getAllLibraries: async () => {
      return await Library.find().populate("songs");
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
    login: async function (_, { email, password }) {
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
    updateLibraryName: async function (_, { id, name }) {
      try {
        const library = await Library.findOneAndUpdate(
          { _id: id },
          { name },
          { new: true }
        );
        if (!library) {
          throw new Error("Library not found");
        }
        return library.populate("songs");
      } catch (err) {
        return new Error(err);
      }
    },
    deleteLibrary: async function (_, { libraryId }) {
      try {
        const library = await Library.findOneAndDelete(libraryId);
        if (!library) {
          throw new Error("Library not found");
        }
        return;
      } catch (err) {
        return new Error(err);
      }
    },
    createUserLibrary: async function (_, { userId, input }) {
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
        return new Error(err);
      }
    },
    addSongToLibrary: async function (_, { libraryId, input }) {
      try {
        const library = await Library.findOne({
          _id: libraryId,
        });
        if (!library) {
          throw new Error("Library not found");
        }
        const song = new Songs(input);
        await song.save();
        await Library.findByIdAndUpdate(
          libraryId,
          { $push: { songs: song._id } },
          { new: true }
        );
        return library.populate("songs");
      } catch (err) {
        return new Error(err);
      }
    },
    removeSongFromLibrary: async function (_, { libraryId, songId }) {
      try {
        const library = await Library.findOne({
          _id: libraryId,
        });
        if (!library) {
          throw new Error("Library not found");
        }
        await Songs.findByIdAndDelete(songId);
        await Library.findByIdAndUpdate(
          libraryId,
          { $pull: { songs: songId } },
          { new: true }
        );
        return library.populate("songs");
      } catch (err) {
        return new Error(err);
      }
    },
  },
};
module.exports = resolvers;
