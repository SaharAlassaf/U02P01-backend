const userModel = require("./../../db/models/userSchema");
const subModel = require("./../../db/models/subSchema");

const budget = (req, res) => {
  userModel
    .find({})
    .select("budget")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const subscr = (req, res) => {};

const subscrByID = (req, res) => {};

const updateBudget = (req, res) => {
  const { _id, budget } = req.body;
  userModel
    .findOneAndUpdate({ _id }, { budget }, { new: true })
    .exec()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const newSub = (req, res) => {
  const { subName, amount, frequency, subDate } = req.body;

subModel
    .create({
      subName,
      amount,
      frequency,
      subDate,
    })
    .then(function (newSub) {
      return userModel.findOneAndUpdate(
        { _id: req.body._id },
        { $push: {sub: newSub._id} },
        { new: true }
      );
    })
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      res.json(err);
    });
};

const updateSub = (req, res) => {};

const deleteSub = (req, res) => {};

module.exports = {
  budget,
  subscr,
  subscrByID,
  updateBudget,
  newSub,
  updateSub,
  deleteSub,
};
