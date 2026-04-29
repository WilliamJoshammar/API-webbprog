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
    .lock { color: #c0392b; font-size: 0.85rem; margin-left: 6px; }
    .open { color: #27ae60; font-size: 0.85rem; margin-left: 6px; }
    .note { background: #fffbea; border-left: 4px solid #f0c040; padding: 10px 16px; margin-top: 2rem; border-radius: 4px; }
    .auth-note { background: #fdecea; border-left: 4px solid #c0392b; padding: 10px 16px; margin-top: 2rem; border-radius: 4px; }
  </style>
</head>
<body>
  <h1>Dokumentation av det här APIet</h1>
  <p>Alla svar returneras i <strong>JSON-format</strong> om inget annat anges.</p>

  <h2>Autentisering</h2>
  <p>
    De flesta routes kräver inloggning. Logga in via <code>POST /login</code> för att få en
    <strong>JWT-token</strong>. Skicka sedan med token i headern på skyddade anrop:
  </p>
  <code>Authorization: Bearer &lt;token&gt;</code>
  <p>Token är giltig i <strong>1 timme</strong>. Efter det måste du logga in igen.</p>

  <div class="auth-note">
    <strong>🔒 Skyddad route</strong> = kräver giltig JWT i Authorization-headern.<br/>
    <strong>🟢 Öppen route</strong> = ingen inloggning krävs.
  </div>

  <h2>Routes – /login</h2>
  <ul>
    <li>
      <strong>POST</strong> <code>/login</code>
      <span class="open">🟢 Öppen</span> –
      Loggar in en användare. Skicka JSON med <code>username</code> och <code>password</code>.
      Returnerar en JWT-token vid lyckad inloggning.
    </li>
  </ul>

  <h2>Routes – /books</h2>
  <ul>
    <li>
      <strong>GET</strong> <code>/books</code>
      <span class="lock">🔒 Kräver inloggning</span> –
      Returnerar en array med alla böcker i databasen.
    </li>
    <li>
      <strong>GET</strong> <code>/books/:id</code>
      <span class="lock">🔒 Kräver inloggning</span> –
      Returnerar en enskild bok med det angivna id:t.
      Svarar med status <code>404</code> om boken inte finns.
    </li>
    <li>
      <strong>POST</strong> <code>/books</code>
      <span class="lock">🔒 Kräver inloggning</span> –
      Skapar en ny bok. Accepterar JSON på formatet:<br/>
      <code>{ "title": "Bokens namn", "author": "Författare", "year": 2024 }</code><br/>
      <em>title</em> och <em>author</em> är obligatoriska. Returnerar den skapade boken med
      HTTP-status <code>201 Created</code>.
    </li>
    <li>
      <strong>PUT</strong> <code>/books/:id</code>
      <span class="lock">🔒 Kräver inloggning</span> –
      Uppdaterar en befintlig bok. Samma format som POST.
      Returnerar det uppdaterade objektet.
    </li>
  </ul>

  <div class="note">
    <strong>Obs:</strong> Skicka alltid <code>Content-Type: application/json</code> i headern
    när du POSTar eller PUTar data.
  </div>
</body>
</html>`);
});

module.exports = router;
