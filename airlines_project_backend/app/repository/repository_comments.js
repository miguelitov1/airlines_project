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

async function addTagsToComment(commentId, tagIds) {
  const pool = await database();
  const deleteQuery = "DELETE FROM comments_tags WHERE comment_id = ?";
  await pool.query(deleteQuery, [commentId]);

  if (tagIds.length > 0) {
    const insertQuery = "INSERT INTO comments_tags (comment_id, tag_id) VALUES ?";
    const values = tagIds.map((tagId) => [commentId, tagId]);
    await pool.query(insertQuery, [values]);
  }
}

async function getCommentsByFlightId(flight_id) {
  const pool = await database();
  const query = "SELECT * FROM comments WHERE flight_id = ?";
  const [comments] = await pool.query(query, [flight_id]);

  return comments;
}


module.exports = {
  post_comment,
  get_all_comments,
  addTagsToComment,
  getCommentsByFlightId,
};