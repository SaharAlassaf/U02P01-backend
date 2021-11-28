const express = require("express");
const {
  signup,
  signin,
  userProfile,
  updateProfile,
  getSubsForUser
} = require("../controllers/auth");
const { checkDuplicateUsernameOrEmail } = require("../../middlewares/auth");

const auth = express.Router();

auth.post("/signup", checkDuplicateUsernameOrEmail, signup);
auth.post("/signin", signin);
auth.get("/profile/:id", userProfile);
auth.put("/updateProfile", checkDuplicateUsernameOrEmail, updateProfile);
// auth.get("/subs", getSubsForUser);


module.exports = auth;
