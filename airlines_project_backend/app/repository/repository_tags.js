'use strict';

const database = require("../infrastructure/database");

async function getTagsByNames(tagNames) {
  const pool = await database();
  const query = "SELECT * FROM tags WHERE tag IN (?)";
  const [tags] = await pool.query(query, [tagNames]);

  return tags;
}

async function getTagsByIds(tagIds) {
  const pool = await database();
  const selectQuery = "SELECT * FROM tags WHERE id IN (?)";
  const [rows] = await pool.query(selectQuery, [tagIds]);
  return rows;
}

async function createTags(tagNames) {
  const pool = await database();
  const query = "INSERT INTO tags (tag) VALUES (?)";
  const values = tagNames.map((tagName) => [tagName]);
  await pool.query(query, values);
}

// async function getAllTagsByCommentId(commentId) {
//   const pool = await database();
//   const query = "SELECT tag_id FROM comments_tags WHERE comment_id = ?";
//   const [rows] = await pool.query(query, [commentId]);
//   const tagIds = rows.map(row => row.tag_id);
//   return tagIds;
// }

async function getAllTagsByCommentId(commentIds) {
  const pool = await database();
  const placeholders = commentIds.map(() => "?").join(", ");
  const query = `SELECT comment_id, tag_id FROM comments_tags WHERE comment_id IN (${placeholders})`;
  const [rows] = await pool.query(query, commentIds);
  const tagsByCommentIds = {};

  for (const row of rows) {
    const commentId = row.comment_id;
    const tagId = row.tag_id;

    if (!tagsByCommentIds[commentId]) {
      tagsByCommentIds[commentId] = [];
    }

    tagsByCommentIds[commentId].push(tagId);
  }

  return tagsByCommentIds;
}


module.exports = {
  getTagsByNames,
  createTags,
  getAllTagsByCommentId,
  getTagsByIds,
};