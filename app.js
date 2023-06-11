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
  if (filteredProducts.length === 0 || !filteredProducts) {
    return res.status(404).send("Product not found");
  }
  res.json(filteredProducts);
});

app.get("/api/product/query/", async (req, res) => {
  try {
    const queryName = req.query.name;
    console.log(queryName);
    const productsWithMatchingName = products.filter(
      (item) => item.name.toLowerCase() === queryName.toLowerCase()
    );
    if (productsWithMatchingName.length === 0 || !productsWithMatchingName) {
      return res.status(404).send("Product with this query not found");
    }
    res.json(productsWithMatchingName);
  } catch (err) {
    res.json({ err: "Product not found with this query" });
  }
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
