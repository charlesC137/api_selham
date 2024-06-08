const express = require("express");
const router = express.Router();

const dataMng = require("../utils/data-manager");

router.get("/api/update-cart", (req, res) => {
  res.send(200);
});

router.post("/api/update-cart", async (req, res) => {
  const {
    body: { user },
  } = req;

  await dataMng.updateCart(user);

  res.sendStatus(200);
});

module.exports = router;
