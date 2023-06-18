"use strict";

const database = require("../infrastructure/database");

async function findUserByEmail(email) {
  const pool = await database();
  const query = `SELECT * FROM users WHERE email = ?`;

  const [usuario] = await pool.query(query, email);

  return usuario[0];
}

async function findUserById(id) {
  const pool = await database();
  const query = "SELECT * FROM users WHERE id = ?";
  const [usuario] = await pool.query(query, id);

  return usuario[0];
}

async function findUserByUsername(userId) {
  const pool = await database();
  const query = `SELECT * FROM users WHERE userId = ?`;
  const [usuario] = await pool.query(query, userId);

  return usuario[0];
}

async function createUser(
  userName,
  userLastName,
  email,
  passwordHash,
  userId,
) {
  const pool = await database();
  const insertQuery =
    "INSERT INTO users (userName, userLastName, email, userPassword, userId) VALUES(?, ?, ?, ?, ?)";
  const [created] = await pool.query(insertQuery, [
    userName,
    userLastName,
    email,
    passwordHash,
    userId,
  ]);

  return created.insertId;
}

module.exports = {
  findUserByEmail,
  findUserById,
  findUserByUsername,
  createUser,
};
