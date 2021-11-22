const userModel = require("./../../db/models/userSchema");

const signup = (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new userModel({
    username,
    email,
    password,
  });

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  // let found = false;
  // users.forEach((item) => {
  //   if (email === item.email) {
  //     found = true;
  //   } else {
  //     users.push({
  //       id: users.length + 1,
  //       username: username,
  //       email: email,
  //       password: password,
  //       tasks: [],
  //     });
  //   }
  // });
  // if (found) {
  //   res.status(404).json("username not available");
  // } else {
  //   createUser(users);
  //   res.status(200).json("signin successfully").json(users);
  // }
};

const signin = (req, res) => {
  const { username, password } = req.body;

  userModel
    .find({})
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  // let found = false;
  // let tasks = [];

  // users.forEach((item) => {
  //   if (username === item.username && password === item.password) {
  //     found = true;
  //     tasks = item.tasks.map((item) => item);
  //   }
  // });
  // if (found) {
  //   res.status(200).json("signin successfully", tasks);
  // } else {
  //   res.status(404).json("username or password was invalid");
  // }
};

module.exports = {
  signup,
  signin,
};
