const express = require("express");
const app = express();

require("dotenv").config();
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.use(signUpRouter);
app.use(logInRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port);
