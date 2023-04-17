const { Schema, model } = require("mongoose");

const librarySchema = new Schema({
  name: {
    type: String,
    required: true,
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
});

const Library = model("Library", librarySchema);

module.exports = Library;
