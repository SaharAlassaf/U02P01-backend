const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
require("./db")

//config enviroment variable
dotenv.config();

//instiate express
const app = express();
app.use(express.json())

//router level middleware
const authRouter = require("./routers/routes/auth");
const subRouter = require("./routers/routes/subscription");


// routers
app.use("/auth", authRouter);
app.use("/subscr", subRouter);


//built-in level middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
