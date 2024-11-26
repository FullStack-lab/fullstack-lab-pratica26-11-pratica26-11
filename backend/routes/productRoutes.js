const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (error, rows) => {
    if (error) return res.status(500).send(error.message);
    res.json(rows);
  });
});

module.exports = router;
