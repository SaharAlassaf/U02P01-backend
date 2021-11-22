const userModel = require("./../../db/models/userSchema");

//sign up
const signup = (req, res) => {

  const { name, username, email, password } = req.body;

  const newUser = new userModel({
    name,
    username,
    email,
    password,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//sign in
const signin = (req, res) => {

  // Username
  userModel.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
        return res.status(400).send({ message: "User Not found." });
    }

    // Password
    userModel.findOne({
      password: req.body.password,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "Invalid Password!" });
      }
    });
  });
};

module.exports = {
  signup,
  signin,
};
