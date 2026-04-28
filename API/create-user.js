// Kör med: node create-user.js
// Skapar en testanvändare i databasen med hashat lösenord

const bcrypt = require("bcrypt");
const db = require("./src/db");

const username = "admin";
const plainPassword = "hemligt123";

async function createUser() {
  const hash = await bcrypt.hash(plainPassword, 10);

  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, hash],
    (err, result) => {
      if (err) {
        console.error("Kunde inte skapa användare:", err.message);
      } else {
        console.log(`Användare '${username}' skapad med id ${result.insertId}`);
      }
      db.end();
    }
  );
}

createUser();
