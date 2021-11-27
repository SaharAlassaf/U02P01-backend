const userModel = require("./../../db/models/userSchema");
const subModel = require("./../../db/models/subSchema");

// get budget
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

// get all subscription
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

// get subscription by ID
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

// update budget
const updateBudget = (req, res) => {
  const { id } = req.params;
  const { budget } = req.body;
  userModel
    .findByIdAndUpdate( id ,  {$set:req.body} , { new: true })
    .exec()
    .then((result) => {
      res.send(result);
      // res.send({ message: "Updated successfully" });
    })
    .catch((err) => {
      res.send(err);
    });
};

// create new subscription
const newSub = (req, res) => {
  const { subName, amount, frequency, subDate } = req.body;

  subModel
    .create({
      subName,
      amount,
      frequency,
      subDate,
    })
    .then(async function (newSub) {
      return await userModel.findByIdAndUpdate(
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

// update subscription
const updateSub = (req, res) => {
  const { _id, subName, amount, frequency, subDate } = req.body;
  subModel
    .findByIdAndUpdate(
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

// delete subscription
const deleteSub = (req, res) => {
  const { id, subId } = req.params;

  subModel
    .findByIdAndRemove({ _id: id })
    .then(async function () {
      return await userModel.findOneAndUpdate(
        { _id: id },
        { $pull: { sub: subId } },
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
