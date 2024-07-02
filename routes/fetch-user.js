const express = require("express");
const router = express.Router();

const dataMng = require("../utils/data-manager");

router.get("/api/fetch-user", (req, res) => {
  res.send(200);
});

router.post("/api/fetch-user", async (req, res) => {
  const {
    body: { username },
  } = req;

  const user = await dataMng.fetchUser(username);

  res.json(user);
});

module.exports = router;
