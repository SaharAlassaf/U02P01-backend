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
    .then(() => {
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
        res.status(500).json({ message: err });
        return;
      }

      if (!user) {
        return res.status(400).json({ message: "User Not found." });
      }

      // Password
      userModel
        .findOne({
          password: req.body.password,
        })
        .exec((err, user) => {
          if (err) {
            res.status(500).json({ message: err });
            return;
          }

          if (!user) {
            return res.status(400).json({ message: "Invalid Password!" });
          }
          res.status(200).json(user);
        });
    });
};

// user profile
const userProfile = (req, res) => {
  const { id } = req.params;
  userModel
    .findById(id)
    .populate("sub")
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// get subs for the user
// const getSubsForUser = (req, res) => {
//   userModel
//     .findById({
//       _id: req.body.id,
//     })
//     .populate("sub")
//     .exec()
//     .then((result) => {
//       res.send(result.sub);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };

// update user profile
const updateProfile = (req, res) => {
  const { id, name, username, email, password } = req.body;
  userModel
    .findOneAndUpdate(
      { id },
      { name, username, email, password },
      { new: true }
    )
    .exec()
    .then(() => {
      res.send({ message: "Updated successfully" });
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
  getSubsForUser,
};
