"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const repositoryUsers = require("../../repository/repository_users");
const createErrorJson = require("../../error/create_error_json");

// Validation schema using Joi
const schema = Joi.object().keys({
  userName: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
  userLastName: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
  email: Joi.string().email().required(),
  userPassword: Joi.string().min(8).max(20).required(),
  repeatUserPassword: Joi.ref("userPassword"),
  userId: Joi.string().alphanum().min(3).max(30).required(),
});

async function userRegister(req, res) {
  try {
    // Validation of input data using the defined schema
    await schema.validateAsync(req.body);

    const {
        userName,
        userLastName,
        email,
        userPassword,
        userId,
    } = req.body;

    // Check if the email is already in use
    const existingEmail = await repositoryUsers.findUserByEmail(email);
    if (existingEmail) {
      const error = new Error("A user with that email already exists.");
      error.status = 409;
      throw error;
    }

    // Check if the username is already in use
    const existingUserId = await repositoryUsers.findUserByUsername(
      userId
    );
    if (existingUserId) {
      const error = new Error("The username is already in use.");
      error.status = 409;
      throw error;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(userPassword, 12);

    const id = await repositoryUsers.createUser(
      userName,
      userLastName,
      email,
      passwordHash,
      userId,
    );

    res
      .status(201)
      .send({ id, userName, userLastName, email, userId });
  } catch (err) {
    createErrorJson(err, res);
  }
}

module.exports = userRegister;
