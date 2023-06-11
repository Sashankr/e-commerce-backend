const express = require("express");
const { products } = require("./src/helpers/mock");
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:productID", (req, res) => {
  const productID = Number(req.params.productID);
  const filteredProducts = products.filter((item) => item.id === productID);
  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
