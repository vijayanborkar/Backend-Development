let express = require("express");
let app = express();
let port = 3000;
let cors = require("cors");
app.use(cors());

let cart = [
  { productId: 1, name: "Laptop", price: 50000, quantity: 1 },
  { productId: 2, name: "Mobile", price: 20000, quantity: 2 },
];

// Endpoint 1: Add an Item to the Cart
function addNewItemToCart(productId, name, price, quantity) {
  let itemExists = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].price = price;
      cart[i].name = name;
      cart[i].quantity = quantity;
      itemExists = true;
      break;
    }
  }
  if (!itemExists) {
    cart.push({ productId, name, price, quantity });
  }
  return cart;
}

app.get("/cart/add", (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItemToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
function editQuantity(productId, quantity) {
  let itemExists = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      itemExists = true;
      break;
    }
  }
  return itemExists ? cart : null;
}

app.get("/cart/edit", (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantity(productId, quantity);
  res.json({ cartItems: result });
});

// Endpoint 3: Delete an Item from the Cart
function deleteItem(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  return cart;
}

app.get("/cart/delete", (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = deleteItem(productId);
  res.json({ cartItems: result });
});

// Endpoint 4: Read Items in the Cart
app.get("/cart", (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
function totalQuantity(cart) {
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}

app.get("/cart/total-quantity", (req, res) => {
  let result = totalQuantity(cart);
  res.json({ totalQuantity: result });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
function totalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get("/cart/total-price", (req, res) => {
  let result = totalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
