"use strict";

const repositoryComments = require("../../repository/repository_comments");
const crearErrorJson = require("../../error/crear_error_json");

async function getCommentsByFlightId(req, res) {
  try {

    //get de flight id from params
    const { flightId:flight_id } = req.params;

    //get all comments from the DDBB of the specific flight
    const comments = await repositoryComments.getCommentsByFlightId(flight_id);

    res.status(200).send(comments);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = getCommentsByFlightId;