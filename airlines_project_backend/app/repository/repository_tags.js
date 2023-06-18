'use strict';

const database = require("../infrastructure/database");

async function getTagsByNames(tagNames) {
  const pool = await database();
  const query = "SELECT * FROM tags WHERE tag IN (?)";
  const [tags] = await pool.query(query, [tagNames]);

  return tags;
}

async function createTags(tagNames) {
  const pool = await database();
  const insertQuery = "INSERT INTO tags (tag) VALUES (?)";
  const values = tagNames.map((tagName) => [tagName]);
  await pool.query(insertQuery, values);
}

module.exports = {
  getTagsByNames,
  createTags,
};