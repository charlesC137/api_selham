const express = require("express");
const router = express.Router();

const dataMng = require("../utils/data-manager");

router.get("/api/products", async (req, res) => {
  const response = await dataMng.fetchProducts();

  res.json(response).status(200);
});

module.exports = router;
