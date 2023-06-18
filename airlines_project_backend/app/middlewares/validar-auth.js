"use strict";

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validarAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    // Check if the authorization header is present and has the correct format
    if (!authorization || authorization.startsWith("Beared")) {
      const error = new Error("Authorization required.");
      error.status = 403;
      throw error;
    }

    // Verify and decode the access token using the JWT secret
    const accessToken = authorization.split(" ")[1];

    // Extract the necessary user information from the payload
    const playload = jwt.verify(accessToken, JWT_SECRET);

    // Attach the user information to the request object for future use
    const {
      id,
      userId,
      userName,
      userLastName,
      email,
    } = playload;
    
    req.auth = { id, userId, userName, userLastName, email };

    next();
  } catch (err) {
    res.status(401);
    res.send({ error: err.message });
  }
}
module.exports = validarAuth;
