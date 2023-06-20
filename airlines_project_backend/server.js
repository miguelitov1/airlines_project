"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.json()); //sirve para tomar los datos json del postman
app.use(cors());

const routesUsers = require("./app/routes/routes_users");
const routesComments = require("./app/routes/routes_comments");
const routesFlights = require("./app/routes/routes_flight");
const routesTags = require("./app/routes/routes_tags");


app.use("/api/v1/airline_project/comments", routesComments);
app.use("/api/v1/airline_project/flights", routesFlights);
app.use("/api/v1/airline_project/users", routesUsers);
app.use("/api/v1/airline_project/tags", routesTags);

module.exports = app;
