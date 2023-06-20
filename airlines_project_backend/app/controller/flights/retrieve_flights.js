"use strict";

const repositoryFligths = require("../../repository/repository_flights");
const createErrorJson = require("../../error/create_error_json");

async function getAllFlights(req, res) {
  try {
    //get all flights from DDBB
    const flights = await repositoryFligths.get_all_flights();

    res.status(200).send(flights);
  } catch (err) {
    createErrorJson(err, res);
  }
}

module.exports = getAllFlights;
