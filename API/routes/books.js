const express = require("express");
const router = express.Router();
const db = require("../src/db");

// GET /books – returnerar alla böcker
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /books/:id – returnerar en bok baserat på id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM books WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: "Boken hittades inte." });
    res.json(rows[0]);
  });
});

// POST /books – skapar en ny bok
router.post("/", (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res
      .status(400)
      .json({ error: "Fälten 'title' och 'author' är obligatoriska." });
  }

  db.query(
    "INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
    [title, author, year ?? null],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        "SELECT * FROM books WHERE id = ?",
        [result.insertId],
        (err, rows) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json(rows[0]);
        }
      );
    }
  );
});

module.exports = router;