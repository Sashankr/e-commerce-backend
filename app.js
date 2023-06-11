const express = require("express");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.json([
    { name: "iPhone", price: 600 },
    { name: "iPad", price: 700 },
    { name: "iWatch", price: 800 },
  ]);
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
