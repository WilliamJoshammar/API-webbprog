const express = require("express");
const router = express.Router();

// GET / – HTML-dokumentation
router.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>API-dokumentation</title>
  <style>
    body { font-family: Georgia, serif; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #222; }
    h1   { font-size: 2rem; border-bottom: 3px solid #222; padding-bottom: 8px; }
    h2   { margin-top: 2rem; }
    ul   { line-height: 2; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    .method { font-weight: bold; }
    .note { background: #fffbea; border-left: 4px solid #f0c040; padding: 10px 16px; margin-top: 2rem; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Dokumentation av det här APIet</h1>
  <p>Alla svar returneras i <strong>JSON-format</strong> om inget annat anges.</p>

  <h2>Routes – /books</h2>
  <ul>
    <li>
      <strong>GET</strong> <code>/books</code> –
      Returnerar en array med alla böcker i databasen.
    </li>
    <li>
      <strong>GET</strong> <code>/books/:id</code> –
      Returnerar en enskild bok med det angivna id:t.
      Svarar med status <code>404</code> om boken inte finns.
    </li>
    <li>
      <strong>POST</strong> <code>/books</code> –
      Skapar en ny bok. Accepterar JSON på formatet:<br/>
      <code>{ "title": "Bokens namn", "author": "Författare", "year": 2024 }</code><br/>
      <em>title</em> och <em>author</em> är obligatoriska. Returnerar den skapade boken med
      sitt databas-id och HTTP-status <code>201 Created</code>.
    </li>
  </ul>

  <div class="note">
    <strong>Obs:</strong> Skicka alltid <code>Content-Type: application/json</code> i headern
    när du POSTar data.
  </div>
</body>
</html>`);
});

module.exports = router;
