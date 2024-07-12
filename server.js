const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config(); // allows you to use process.env

const routes = require("./routes/index");
const axios = require("axios"); // ion know man i just used it for the loop at the end of this code

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
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

//the above app.use / app.options allow for CORS requests

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.static("public")); //for ejs nd stuff
app.use(express.urlencoded({ extended: true })); //for parsing requests made to the server
app.use(express.json()); // same as above. to be safe use both
app.use(routes);

app.get("/", (req, res) => {
  res.status(200).json("OK");
});

app.listen(port);

const makeGetRequest = async () => {
  try {
    const response = await axios.get("https://api-selham.onrender.com");
  } catch (error) {
    console.error("Error making GET request:", error);
  }
};

setInterval(makeGetRequest, 30000);
