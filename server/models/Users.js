const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  libraries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Library",
    },
  ],
});

usersSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

usersSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = model("Users", usersSchema);

module.exports = Users;
