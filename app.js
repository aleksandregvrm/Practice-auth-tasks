const express = require("express");
require("dotenv").config();
require("express-async-errors");

const authRouter = require("./router/auth");
const taskRouter = require('./router/tasks');
const authentication = require('./middleware/authentication');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require('./middleware/errorHandler');

const connectDB = require("./db/connect");


const app = express();

app.use(rateLimit({
  windowMs:15*60*1000,
  max:100,
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/jobs',authentication,taskRouter)

app.get("/", (req, res) => {
  res.send(
    "<h1>try to get it done soon</h1> <button>dachi modi gaajvi aqedan</button>"
  );
});

// Errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`the server is listening on the port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
