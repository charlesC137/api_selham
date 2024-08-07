const express = require("express");
const router = express.Router();

const hashpass = require("../utils/password-methods");
const dataMng = require("../utils/data-manager");

class user {
  constructor(userLogins) {
    this.userLogins = userLogins;
    this.cart = [];
  }
}

class userLogins {
  constructor(email, username, password) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}

router.get("/api/signup", (req, res) => {
  res.sendStatus(200);
});

router.post("/api/signup", validateBody, (req, res) => {
  const {
    body: { email, username, password, state },
  } = req;

  if (state.isValid) {
    const newUser = new user(
      new userLogins(email, username, hashpass.hashPassword(password))
    );

    dataMng.createUser(newUser);
    res.json(state).status(200);
  } else {
    res.status(404).json(state);
  }
});

async function validateBody(req, res, next) {
  const users = await dataMng.fetchUsersAsync();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const usernameRegex = /^\w+/;
  const passwordRegex = /^[@$!%*#?&a-zA-Z0-9._-]+$/;

  const {
    body: { email, username, password },
  } = req;

  req.isValid = false;

  if (
    emailRegex.test(email) &&
    usernameRegex.test(username) &&
    passwordRegex.test(password)
  ) {
    if (users.length === 0) {
      req.isValid = true;
      req.errorMsg = "";
    } else {
      const emailCheck = users.find((user) => {
        return email === user.userLogins.email;
      });

      const usernameCheck = users.find((user) => {
        return username === user.userLogins.username;
      });

      if (emailCheck) {
        req.errorMsg = "E-mail already registered";
        req.isValid = false;
      } else if (usernameCheck) {
        req.errorMsg = "Username already in use";
        req.isValid = false;
      } else {
        req.isValid = true;
        req.errorMsg = "";
      }
    }
  } else {
    req.errorMsg = "Invalid input";
  }

  req.body.state = {
    isValid: req.isValid,
    errorMsg: req.errorMsg,
    redirectUrl: "https://charlesc137.github.io/selham/log-in",
  };
  next();
}

module.exports = router;
