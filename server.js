const express = require("express");
const app = express();

require("dotenv").config();
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(signUpRouter);
app.use(logInRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port);
