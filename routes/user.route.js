const usercontroller = require("../controller/create");
const addcontroller = require("../controller/add.controller");

const express = require('express');
const route = express.Router();
//register
route.post("/register", usercontroller.register);
//login
route.post("/login", usercontroller.login);


//addaddress
route.post("/users/:userId/addresses", addcontroller.addAddress);

//updateaddress
route.put('/users/:userId/:addressId', addcontroller.updateAddress);


module.exports = route;