"use strict";

const express = require("express");
//const validarAuth = require("../middlewares/validar-auth");

const createFlight = require("../controller/create_flight");
const getAllFlight = require("../controller/retrieve_flights");

const router = express.Router();

router.route("/").get((req, res) => getAllFlight(req, res));

router
  .route("/")
  //.all(validarAuth)
  .post((req, res) => createFlight(req, res));

  module.exports = router;