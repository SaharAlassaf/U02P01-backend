const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
require("./db")

//config enviroment variable
dotenv.config();

//instiate express
const app = express();
app.use(express.json())

//router level middleware
const authRouter = require("./routers/routes/auth");


// routers
app.use("/auth", authRouter);

//built-in level middleware
app.use(morgan("dev"));
app.use(cors());


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
