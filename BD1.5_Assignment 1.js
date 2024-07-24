let express = require("express");
let core = require("cors");

let app = express();
app.use(core());
let port = 3000;

// Endpoint 1
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let cart = newItemPrice + cartTotal;
  res.send(cart.toString());
});

// Endpoint 2
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";
  if (isMember) {
    let discount = cartTotal - cartTotal * 0.1;
    res.send(discount.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

// Endpoint 3
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let tax = cartTotal * 0.05;
  res.send(tax.toString());
});

// Endpoint 4
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result = "";
  if (shippingMethod === "normal") {
    result = distance * 0.02;
  } else if (shippingMethod === "express") {
    result = distance * 0.01;
  } else {
    result = "Invali shipping method";
  }
  res.send(result.toString());
});

// Endpoint 5
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingMethod = weight * distance * 0.1;
  res.send(shippingMethod.toString());
});

// Endpoint 6
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
