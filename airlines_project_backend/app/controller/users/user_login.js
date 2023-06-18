"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const repositoryUsers = require("../../repository/repository_users");
const crearErrorJson = require("../../error/create_error_json");

// Validation schema using Joi
const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  userPassword: Joi.string().min(8).max(30).required(),
});

async function loginUser(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { email, userPassword } = req.body;

    //check if the email exist
    const user = await repositoryUsers.findUserByEmail(email);
    
    if (!user) {
        const error = new Error("The username or password is incorrect.");
        error.status = 403;
        throw error;
    }

    //check if the password is correect
    const validarContrasenha = await bcrypt.compare(
        userPassword,
        user.userPassword,
    );

    if (!validarContrasenha) {
      const error = new Error("The username or password is incorrect.");
      error.status = 403;
      throw error;
    }

    // Generate the JWT (JSON Web Token)
    const secret = process.env.JWT_SECRET;
    const { id, userName, userId, userLastName } = user;
    const jwtTokenExpiration = "30m";
    const payload = {
      id,
      userName,
      userId,
      userLastName,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    // Prepare the response with the token and its expiration time
    const responde = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.status(200).send(responde);
  } catch (err) {
    crearErrorJson(err, res);
  }
}

module.exports = loginUser;
