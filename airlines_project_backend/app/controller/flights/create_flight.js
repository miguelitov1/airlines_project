"use strict";

const Joi = require("joi");
const repositoryFlights = require("../../repository/repository_flights");
const crearErrorJson = require("../../error/create_error_json");

// Validation schema using Joi
const schema = Joi.object().keys({
    flightId: Joi.number().positive().required(),
    airlineName: Joi.string().max(4000).required(),
  });
  
  async function createFlights(req, res) {
    try {
  
      const {
        flightId,
        airlineName,
      } = req.body;
  
      // Verifying if the flight already exist in the database
      const existFlight = await repositoryFlights.find_flight_by_id(flightId);
      if (existFlight) {
        const error = new Error("There is already a flight with that ID.");
        error.status = 409;
        throw error;
      }

      //create the new flight
      const id = await repositoryFlights.post_flight(
        flightId,
        airlineName,
      );
  
      res.status(201).send({ id, flightId, airlineName });
    } catch (err) {
      crearErrorJson(err, res);
    }
  }
  
  module.exports = createFlights;
  