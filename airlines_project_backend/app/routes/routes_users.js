"use strict";

const express = require("express");
//const validateAuth = require("../middlewares/validate_auth");

const userRegister = require("../controller/users/user_register");
const userLogin = require("../controller/users/user_login");

const router = express.Router();

//Publicas
router.route("/register").post((req, res) => userRegister(req, res));
router.route("/login").post((req, res) => userLogin(req, res));

module.exports = router;
