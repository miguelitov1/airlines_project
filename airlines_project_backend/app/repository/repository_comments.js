"use strict";

const database = require("../infrastructure/database");

async function post_comment(
  user_id,
  flight_id,
  userComment,
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO comments (user_id, flight_id, userComment) VALUES(?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    user_id,
    flight_id,
    userComment,
  ]);

  return created.insertId;
}

async function get_all_comments() {
  const pool = await database();
  const query =
    "SELECT * FROM comments ORDER BY commentDate DESC";
  const [articulos] = await pool.query(query);

  return articulos;
}

module.exports = {
  post_comment,
  get_all_comments,
};
