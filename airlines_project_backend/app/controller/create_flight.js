"use strict";

const Joi = require("joi");
const repositoryFlights = require("../repository/repository_flights");
const crearErrorJson = require("../error/crear_error_json");

const schema = Joi.object().keys({
    flightId: Joi.number().positive().required(),
    airlineName: Joi.string().max(4000).required(),
  });
  
  async function createFlights(req, res) {
    try {
      //await schema.validateAsync(req.body);
  
      //const id_usuario = req.auth.id;
  
      const {
        flightId,
        airlineName,
      } = req.body;
  
      const existFlight = await repositoryFlights.find_flight_by_id(flightId);
      if (existFlight) {
        const error = new Error("There is already a flight with that ID.");
        error.status = 409;
        throw error;
      }

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
  