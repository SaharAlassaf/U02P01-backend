const express = require("express");
const {
  budget,
  subscr,
  subscrByID,
  updateBudget,
  newSub,
  updateSub,
  deleteSub,
} = require("../controllers/subscription");

const subscription = express.Router();

// subscription.get("/budget", budget);
// subscription.get("/subscrByID", subscrByID);
subscription.put("/updateBudget/:id", updateBudget);
subscription.post("/newSub", newSub);
subscription.put("/updateSub", updateSub);
subscription.delete("/deleteSub/:id/:subId", deleteSub);

module.exports = subscription;
