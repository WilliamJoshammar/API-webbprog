const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Headern ska vara: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Åtkomst nekad. Token saknas." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "hemlig_nyckel_123");
    req.user = decoded; // gör användardatan tillgänglig i routes
    next();
  } catch (err) {
    return res.status(401).json({ error: "Ogiltig eller utgången token." });
  }
}

module.exports = verifyToken;