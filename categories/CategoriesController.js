const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("categories");
});

router.get("/admin/categories/new", (req, res) => {
  res.send("Create category");
});

module.exports = router;
