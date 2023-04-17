const { Schema, model } = require("mongoose");

const songsSchema = new Schema({
  trackName: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  songPhoto: {
    type: String,
    required: true,
  },
  releaseData: {
    type: String,
  },
  lyrics: {
    type: String,
    required: true,
  },
});

const Songs = model("Songs", songsSchema);

module.exports = Songs;
