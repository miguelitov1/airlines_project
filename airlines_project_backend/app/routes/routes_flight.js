"use strict";

const express = require("express");
//const validateAuth = require("../middlewares/validate_auth");

const createFlight = require("../controller/flights/create_flight");
const getAllFlight = require("../controller/flights/retrieve_flights");

const router = express.Router();

router.route("/").get((req, res) => getAllFlight(req, res));

router
  .route("/")
  //.all(validateAuth)
  .post((req, res) => createFlight(req, res));

  module.exports = router;