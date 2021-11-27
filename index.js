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


//built-in level middleware
app.use(morgan("dev"));
app.use(helmet());
//cors should be before routers
app.use(cors());
app.options('*', cors())


// routers
app.use("/auth", authRouter);
app.use("/subscr", subRouter);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server on ${PORT}`);
});
