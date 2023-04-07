const { Schema, model } = require("mongoose");

const librarySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
