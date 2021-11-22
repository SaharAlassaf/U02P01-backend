const express = require("express");
const {
  signup,
  signin,
  userProfile,
  updateProfile,
} = require("../controllers/auth");
const { checkDuplicateUsernameOrEmail } = require("../../middlewares/auth");

const auth = express.Router();

auth.post("/signup", checkDuplicateUsernameOrEmail, signup);
auth.post("/signin", signin);
auth.get("/profile", userProfile);
auth.put("/updateProfile", checkDuplicateUsernameOrEmail, updateProfile);

module.exports = auth;
