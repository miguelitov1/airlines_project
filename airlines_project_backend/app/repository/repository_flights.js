"use strict";

const database = require("../infrastructure/database");

async function post_flight(
  flightId,
  airlineName,
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO flights (flightId, airlineName ) VALUES(?, ?)";
  const [created] = await pool.query(insertQuery, [
    flightId,
    airlineName,
  ]);

  return created.insertId;
}

async function get_all_flights() {
  const pool = await database();
  const query =
    "SELECT * FROM flights";
  const [articulos] = await pool.query(query);

  return articulos;
}

async function find_flight_by_id(flightId) {
  const pool = await database();
  const query = `SELECT * FROM flights WHERE flightId = ?`;

  const [usuario] = await pool.query(query, flightId);

  return usuario[0];
}

module.exports = {
  post_flight,
  get_all_flights,
  find_flight_by_id,
};
