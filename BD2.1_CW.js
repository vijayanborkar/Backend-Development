let express = require("express");
let app = express();
let port = 3000;

// Exercise 1:
let person = {
  firstName: "Amit",
  lastName: "Sharma",
  gender: "male",
  age: 30,
  isMember: true,
};

app.get("/person", (req, res) => {
  res.json(person);
});

// Exercise 2:
function getFullName(person) {
  return person.firstName + " " + person.lastName;
}

app.get("/person/fullname", (req, res) => {
  let fullName = getFullName(person);
  res.json({ fullName: fullName });
});

// Exercise 3:
function getfirstNameAndGender(person) {
  return {
    firstName: person.firstName,
    gender: person.gender,
  };
}

app.get("/person/firstname-gender", (req, res) => {
  let firstNameAndGender = getfirstNameAndGender(person);
  res.json(firstNameAndGender);
});

// Exercise 4:
function getIncrementAgeObject(person) {
  person.age = person.age + 1;
  return person;
}

app.get("/person/increment-age", (req, res) => {
  let updatedObject = getIncrementAgeObject(person);
  res.json(updatedObject);
});

// Exercise 5:
function getFullNameAndMembership(person) {
  return {
    fullName: getFullName(person),
    isMember: person.isMember,
  };
}

app.get("/person/fullname-membership", (req, res) => {
  let fullNameAndMembership = getFullNameAndMembership(person);
  res.json(fullNameAndMembership);
});

// Exercise 6:
function getFinalPrice(cartTotal, isMember) {
  let discount = 0.1;
  let finalprice;
  if (isMember) {
    finalprice = cartTotal * (1 - discount);
  } else {
    finalprice = cartTotal;
  }
  return { finalprice: finalprice.toFixed(2) };
}

app.get("/person/final-price", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPrice(cartTotal, person.isMember);
  res.json(finalPrice);
});

// Exercise 7:
function getTotalShippingCost(cartTotal, isMember) {
  let shippingCost;
  if (cartTotal > 500 && isMember) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return { shippingCost: shippingCost.toFixed(2) };
}

app.get("/person/shipping-cost", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getTotalShippingCost(cartTotal, person.isMember);
  res.json(shippingCost);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
