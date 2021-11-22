const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { checkDuplicateUsernameOrEmail } = require("../../middlewares/auth")

const auth = express.Router();

auth.post("/signup", checkDuplicateUsernameOrEmail, signup);
auth.post("/signin", signin);

module.exports = auth;