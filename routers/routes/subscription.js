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

subscription.get("/budget", budget);
subscription.get("/subscr", subscr);
subscription.get("/subscrByID", subscrByID);
subscription.put("/updateBudget", updateBudget);
subscription.post("/newSub", newSub);
subscription.put("/updateSub", updateSub);
subscription.delete("/deleteSub", deleteSub);

module.exports = subscription;
