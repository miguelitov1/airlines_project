"use strict";

const repositoryFligths = require("../../repository/repository_flights");
const crearErrorJson = require("../../error/crear_error_json");

async function getAllFlights(req, res) {
  try {
    const flights = await repositoryFligths.get_all_flights();

    res.status(200).send(flights);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = getAllFlights;
