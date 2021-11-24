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

const subscr = (req, res) => {
  subModel
    .find({})
    .select()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const subscrByID = (req, res) => {
  const { _id } = req.body;
  subModel
    .findById({ _id })
    .select()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateBudget = (req, res) => {
  const { _id, budget } = req.body;
  userModel
    .findOneAndUpdate({ _id }, { budget }, { new: true })
    .exec()
    .then((result) => {
      res.send({ message: "Updated successfully" });
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
        { $push: { sub: newSub._id } },
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

const updateSub = (req, res) => {
  const { _id, subName, amount, frequency, subDate } = req.body;
  subModel
    .findOneAndUpdate(
      { _id },
      { subName, amount, frequency, subDate },
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

const deleteSub = (req, res) => {
  subModel
    .findByIdAndRemove({ _id: req.body._id })
    .then(async function (delSub) {
      return await userModel.findOneAndUpdate(
        { _id: req.body.id },
        { $pull: { sub: req.body._id } },
        { new: true }
      );
    })
    .then(() => {
      res.send({ message: "Deleted successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  budget,
  subscr,
  subscrByID,
  updateBudget,
  newSub,
  updateSub,
  deleteSub,
};
