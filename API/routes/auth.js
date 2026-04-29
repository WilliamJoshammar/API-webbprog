const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../src/db");

// POST /login – loggar in en användare och returnerar en JWT
router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Fälten 'username' och 'password' är obligatoriska." });
  }

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      if (rows.length === 0) {
        return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord." });
      }

      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord." });
      }

      // Skapa JWT – token gäller i 1 timme
      const token = jwt.sign(
        { id: user.id, username: user.username },
        "hemlig_nyckel_123",
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
