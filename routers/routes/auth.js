const express = require("express");
const { signup, signin } = require("../controllers/auth");
const { checkDuplicateUsernameOrEmail } = require("../../middlewares/auth")

const auth = express.Router();

auth.post("/signup", checkDuplicateUsernameOrEmail, signup);
auth.post("/signin", signin); 
auth.get("/userprofile", );
auth.put("/userprofile", );

module.exports = auth;