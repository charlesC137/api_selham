const express = require("express");
const router = express.Router();

const hashpass = require("../utils/password-methods");
const dataMng = require("../utils/data-manager");

let users;

router.get("/api/login", (req, res) => {
  res.sendStatus(200);
});

router.post("/api/login", validateBody, (req, res) => {
  const {
    body: { userInput, password, state },
  } = req;

  if (state.isValid) {
    res.send(state);
  } else {
    res.status(404).send(state);
  }
});

async function validateBody(req, res, next) {
  users = await dataMng.fetchUsersAsync();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const usernameRegex = /^\w+/;
  const passwordRegex = /^[@$!%*#?&a-zA-Z0-9._-]+$/;

  let passwordState;
  let userInputState;

  const {
    body: { userInput, password },
  } = req;

  req.isValid = false;

  if (
    (emailRegex.test(userInput) || usernameRegex.test(userInput)) &&
    passwordRegex.test(password)
  ) {
    if (users.length === 0) {
      //res.send("redirect to login");
    } else {
      for (const user of users) {
        if (
          userInput === user.userLogins.email ||
          userInput === user.userLogins.username
        ) {
          userInputState = true;
          if (hashpass.comparePassword(password, user.userLogins.password)) {
            passwordState = true;
          }
        }
      }
    }
  } else {
    req.errorMsg = "Invalid input";
  }

  if (passwordState && userInputState) {
    req.isValid = true;
  } else if (!userInputState) {
    req.errorMsg = "User not found";
  } else if (!passwordState) {
    req.errorMsg = "Incorrect password";
  }

  req.body.state = {
    isValid: req.isValid,
    errorMsg: req.errorMsg,
  };

  next();
}

module.exports = router;
