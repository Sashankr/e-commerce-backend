require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/user");
const productRoutes = require("./src/routes/product");
const cartRoutes = require("./src/routes/cart");
const orderRoutes = require("./src/routes/order");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
