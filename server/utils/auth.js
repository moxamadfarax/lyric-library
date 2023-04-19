const jwt = require("jsonwebtoken");
const _ = require("lodash");
require("dotenv").config();

const secret = process.env.JSWT_SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      return new Error("Invalid Token");
    }
    return req;
  },

  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  userCheck: function (username, password, email) {
    if (_.isEmpty(username) && _.isEmpty(password) && _.isEmpty(email)) {
      return "Please complete all fields";
    }

    if (!_.inRange(_.size(username), 8, 31)) {
      return "Username must be between 8 and 30 characters";
    }

    if (_.isEmpty(password)) {
      return "Password can't be empty";
    }

    if (!_.inRange(_.size(password), 8, 31)) {
      return "Password must be between 8 and 30 characters";
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return "Invalid email address";
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      return "Password must contain at least one special character";
    }

    if (!/[a-z]+/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[A-Z]+/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    return null;
  },
};
