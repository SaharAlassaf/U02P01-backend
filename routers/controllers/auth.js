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
  userModel
    .findOne({
      username: req.body.username,
    })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      // Password
      userModel
        .findOne({
          password: req.body.password,
        })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (!user) {
            return res.status(400).send({ message: "Invalid Password!" });
          }
          res.status(200).send({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
          });
        });
    });
};

const userProfile = (req, res) => {
  userModel
    .findOne({
      id: req.body.id,
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateProfile = (req, res) => {
  const { _id, name, username, email, password } = req.body;
  userModel
    .findOneAndUpdate(
      { _id },
      { name, username, email, password },
      { new: true }
    )
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  signup,
  signin,
  userProfile,
  updateProfile,
};
