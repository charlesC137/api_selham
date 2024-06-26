const express = require("express");
const router = express.Router();

const dataMng = require("../utils/data-manager");

router.get("/api/delete", (req, res) => {
  res.send(200);
});

router.post("/api/delete", async (req, res) => {
  const {
    body: { username },
  } = req;

  await dataMng.deleteAccount(username);

  res.send(200);
});

module.exports = router;
