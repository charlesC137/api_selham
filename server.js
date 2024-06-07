const express = require("express");
const app = express();

require("dotenv").config();
const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(signUpRouter);
app.use(logInRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port);
