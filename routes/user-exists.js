const express = require("express");
const router = express.Router();

const dataMng = require("../utils/data-manager");

router.get("/api/user-exists", (req, res) => {
  res.send(200);
});

router.post("/api/user-exists", async (req, res) => {
  const {
    body: { username },
  } = req;

  const user = await dataMng.findUser(username);

  res.json(user);
});

module.exports = router;
