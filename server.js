const express = require("express");
const app = express();

require("dotenv").config();

const signUpRouter = require("./routes/sign-up");
const logInRouter = require("./routes/log-in");
const productsRouter = require("./routes/products");
const deleteAcctRouter = require("./routes/delete-account");
const updateCartRouter = require("./routes/update-cart");

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


app.options("/api/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.send();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(signUpRouter);
app.use(logInRouter);
app.use(productsRouter);
app.use(deleteAcctRouter);
app.use(updateCartRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(port);
