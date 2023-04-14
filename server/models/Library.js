const { Schema, model } = require("mongoose");

const librarySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Library = model("Library", librarySchema);

module.exports = Library;
