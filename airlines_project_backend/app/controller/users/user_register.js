"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const repositoryUsers = require("../../repository/repository_users");
const crearErrorJson = require("../../error/crear_error_json");

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
    await schema.validateAsync(req.body);

    const {
        userName,
        userLastName,
        email,
        userPassword,
        userId,
    } = req.body;

    const existingEmail = await repositoryUsers.findUserByEmail(email);
    if (existingEmail) {
      const error = new Error("A user with that email already exists.");
      error.status = 409;
      throw error;
    }

    const existingUserId = await repositoryUsers.findUserByUsername(
      userId
    );
    if (existingUserId) {
      const error = new Error("The username is already in use.");
      error.status = 409;
      throw error;
    }

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
    crearErrorJson(err, res);
  }
}

module.exports = userRegister;
