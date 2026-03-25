const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/", require("./routes/docs"));
app.use("/books", require("./routes/books"));

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
