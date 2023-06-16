"use strict";

const database = require("../infrastructure/database");

async function put_comment(
  commentId,
  user_id,
  flight_id,
  userComment,
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO comments (commentId, user_id, flight_id, userCommen) VALUES(?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    commentId,
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
  put_comment,
  get_all_comments,
};
