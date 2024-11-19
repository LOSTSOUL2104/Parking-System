const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let totalBalance = 100.0;
let availableBalance = 75.0; 

app.get("/api/balance", (req, res) => {
  res.json({ totalBalance, availableBalance });
});

app.post("/api/add-funds", (req, res) => {
  const { amount } = req.body;

  if (amount && amount > 0) {
    totalBalance += amount;
    availableBalance += amount;
    res.json({ totalBalance, availableBalance });
  } else {
    res.status(400).json({ error: "Invalid amount" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
