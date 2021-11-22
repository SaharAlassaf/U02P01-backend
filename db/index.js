const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// const BACE_URI = process.env.BACE_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(`mongodb://localhost:27017/users`, options, () => {
  try {
    console.log("db connected");
  } catch (error) {
    console.error(error);
  }
});